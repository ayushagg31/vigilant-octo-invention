import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../config/googleAuth.config";
import { removeCollection } from "../config/qdrant.config";
import logger from "./logging.service";
import { deleteObject } from "./r2.service";
import { plans } from "../config/plan.config";
import { FREE_TIER } from "../constants/plan.constants";
import { isToday } from "../utils";

import "dotenv/config";

const COLLECTION_LIMIT = process.env.COLLECTION_LIMIT || 5;

const db = getFirestore(app);

export const createUser = async (user) => {
  // Get the currently signed-in user
  if (user) {
    try {
      const userRef = doc(db, `users/${user.email}`);
      const userDoc = await getDoc(userRef);
      const initialDoc = {
        uid: user.uid,
        displayName: user.name,
        email: user.email,
        currentPlan: FREE_TIER,
        collections: [],
        usageInfo: {
          query: {
            count: 0,
            lastUpdatedAt: Date.now(),
          },
          pdf: {
            count: 0,
            lastUpdatedAt: Date.now(),
          },
          mp3: {
            count: 0,
            lastUpdatedAt: Date.now(),
          },
        },
      };
      if (!userDoc.exists()) {
        await setDoc(userRef, initialDoc);
      }
    } catch (e) {
      logger.error("Failed to create user: ", e);
      throw new Error("Failed to create user", e.message);
    }
  }
};

export const addCollection = async ({
  collectionId,
  collectionName,
  ytUrl = null,
  pdfUrl = null,
  fileType,
  userEmail,
}) => {
  try {
    const userRef = doc(db, `users/${userEmail}`);
    // check if total collection count exceeding the allowed limit
    const { collections, usageInfo } = await fetchCollections(userEmail);

    const { count, lastUpdatedAt } = usageInfo[fileType];
    const isLastUpdatedToday = isToday(lastUpdatedAt);

    const updatedCollections = [...collections];
    if (collections.length >= COLLECTION_LIMIT) {
      // delete the leastRecentlyAccessed Collection
      const oldestTimestamp = Math.min(
        ...collections.map((col) => col.lastAccessedTimeStamp)
      );
      const indexOfOldest = collections.findIndex(
        (col) => col.lastAccessedTimeStamp === oldestTimestamp
      );

      const oldestCollection = collections[indexOfOldest];
      // delete indexOfOldest
      updatedCollections.splice(indexOfOldest, 1);
      await removeCollection(oldestCollection.collectionId);
      oldestCollection.fileType === "pdf" &&
        (await deleteObject({
          bucketName: "pdfs",
          objectKey: oldestCollection.collectionId,
        }));
    }
    const newCollection = {
      collectionId,
      collectionName,
      ytUrl,
      pdfUrl,
      fileType,
      createdAt: Date.now(),
      lastAccessedTimeStamp: Date.now(),
    };
    updatedCollections.push(newCollection);
    await updateDoc(userRef, {
      collections: updatedCollections,
      usageInfo: {
        ...usageInfo,
        [fileType]: {
          count: isLastUpdatedToday ? count + 1 : 1,
          lastUpdatedAt: Date.now(),
        },
      },
    });
  } catch (e) {
    console.log(e);
    logger.error("Error adding document ", userEmail, collectionId, e);
    throw new Error("Failed to add document");
  }
};

export const updateCollection = async ({
  collectionId,
  userEmail,
  updatedValue,
}) => {
  try {
    const userRef = doc(db, `users/${userEmail}`);
    const { collections } = await fetchCollections(userEmail);
    const collectionIdx = collections.findIndex(
      (col) => col.collectionId === collectionId
    );
    if (collectionIdx !== -1) {
      collections[collectionIdx] = {
        ...collections[collectionIdx],
        ...updatedValue,
      };

      await updateDoc(userRef, {
        collections,
      });
    }
  } catch (e) {
    logger.error("Failed to update collection: ", userEmail, collectionId, e);
    throw new Error("Failed to update collection");
  }
};

export const deleteCollection = async ({ collectionId, userEmail }) => {
  // check if collection exists for the user,
  // if yes delete it from firestore and Qdrant
  try {
    const userRef = doc(db, `users/${userEmail}`);
    const { collections, isVerified } = await verifyCollection({
      collectionId,
      userEmail,
    });
    if (isVerified) {
      const collectionIndexToDelete = collections.findIndex(
        (col) => col.collectionId === collectionId
      );
      const collectionToDelete = collections[collectionIndexToDelete];
      const isPDF = collectionToDelete.fileType === "pdf";

      isPDF &&
        (await deleteObject({ bucketName: "pdfs", objectKey: collectionId }));

      collections.splice(collectionIndexToDelete, 1);
      await updateDoc(userRef, {
        collections,
      });
      await removeCollection(collectionId);
      return {
        collections,
      };
    } else {
      logger.error(
        "Collection doesn't belong to user",
        collectionId,
        userEmail
      );
      return {
        collections: collections,
      };
    }
  } catch (e) {
    console.error("Failed to delete collection: ", userEmail, collectionId, e);
    throw new Error("Failed to delete collection");
  }
};

export const verifyCollection = async ({ collectionId, userEmail }) => {
  try {
    const { collections } = await fetchCollections(userEmail);
    let collection = collections.find(
      (col) => col["collectionId"] === collectionId
    );
    const isVerified = !!collection;
    if (isVerified) {
      await updateCollection({
        collectionId: collection.collectionId,
        userEmail,
        updatedValue: { lastAccessedTimeStamp: Date.now() },
      });
    }
    return {
      collections,
      isVerified,
    };
  } catch (e) {
    logger.error("Failed to verify collection: ", userEmail, collectionId, e);
    throw new Error("Failed to verify collection");
  }
};

export const fetchCollections = async (userEmail) => {
  try {
    const userRef = doc(db, `users/${userEmail}`);
    const userDoc = await getDoc(userRef);
    let collections = [];
    if (userDoc.exists()) {
      const data = await userDoc.data();
      collections = data["collections"] || [];
      return {
        collections,
        currentPlan: data.currentPlan || FREE_TIER,
        usageInfo: data.usageInfo,
      };
    }
    throw new Error("No collection found for the user");
  } catch (e) {
    logger.error("Failed to fetch collections ", userEmail, e);
    throw new Error("Failed to fetch collections");
  }
};

export const updateUser = async ({ userEmail, ...rest }) => {
  try {
    const userRef = doc(db, `users/${userEmail}`);
    await updateDoc(userRef, {
      ...rest,
    });
  } catch (e) {
    logger.error(`Failed to update user , ${userEmail}, ${rest}, ${e}`);
    throw new Error("Failed to update user");
  }
};

export const fetchUsageInfo = async ({ userEmail }) => {
  try {
    const userRef = doc(db, `users/${userEmail}`);
    const userDoc = await getDoc(userRef);
    let usageInfo = {};
    if (userDoc.exists()) {
      usageInfo = (await userDoc.data()["usageInfo"]) || {};
    }
    return usageInfo;
  } catch (e) {
    logger.error("Failed to fetch usage Info", userEmail, e);
    throw new Error("Failed to fetch usage Info");
  }
};

export const fetchPlanInfo = async ({ userEmail }) => {
  try {
    const userRef = doc(db, `users/${userEmail}`);
    const userDoc = await getDoc(userRef);
    let planInfo;
    if (userDoc.exists()) {
      planInfo = (await userDoc.data()["currentPlan"]) || FREE_TIER;
    }
    return planInfo;
  } catch (e) {
    logger.error("Failed to fetch planInfo", userEmail, e);
    throw new Error("Failed to fetch planInfo");
  }
};

const pick = (valuesToPick, obj) => {
  let currentObj = {};
  valuesToPick.forEach((key) => {
    currentObj[key] = obj[key];
  });
  return currentObj;
};

export const fetchPlanList = async () => {
  const planToDisplay = pick(["free_tier", "plus_tier"], plans);

  let displayToFe = [];
  for (let plan in planToDisplay) {
    let currentPlan = planToDisplay[plan];
    let pricing = currentPlan.pricing;
    let planOfLocation = pricing["in"];
    let valuesToPick = [
      "planName",
      "primaryText",
      "amount",
      "duration",
      "currency",
      "features",
    ];
    let currentObj = pick(valuesToPick, planOfLocation);
    displayToFe.push(currentObj);
  }
  return displayToFe;
};
