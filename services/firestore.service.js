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

const COLLECTION_LIMIT = 3;

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
        queryInfo: {
          count: 0,
          lastUpdatedAt: Date.now(),
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
    const { collections } = await fetchCollections(userEmail);
    const updatedCollections = [...collections];
    if (collections.length >= COLLECTION_LIMIT) {
      // set deletedAt the leastRecentAccessed Collection
      const oldestTimestamp = Math.min(
        ...collections.map((col) => col.lastAccessedTimeStamp)
      );
      const indexOfOldest = collections.findIndex(
        (col) => col.lastAccessedTimeStamp === oldestTimestamp
      );

      const oldestCollection = collections[indexOfOldest];
      if (indexOfOldest !== -1) {
        updatedCollections[indexOfOldest] = {
          ...updatedCollections[indexOfOldest],
          deletedAt: Date.now(),
        };
        await removeCollection(oldestCollection.collectionId);
        oldestCollection.fileType === "pdf" &&
          (await deleteObject({
            bucketName: "pdfs",
            objectKey: oldestCollection.collectionId,
          }));
      }
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
    });
  } catch (e) {
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
      const updatedCollections = collections.map((col) => {
        if (col.collectionId === collectionId) {
          return {
            ...col,
            deletedAt: Date.now(),
          };
        }
        return col;
      });
      await updateDoc(userRef, {
        collections: updatedCollections,
      });
      await removeCollection(collectionId);

      const isPDF =
        updatedCollections.find((col) => col.collectionId === collectionId)
          .fileType === "pdf";

      isPDF &&
        (await deleteObject({ bucketName: "pdfs", objectKey: collectionId }));
      return {
        collections: updatedCollections,
        activeCollections: updatedCollections.filter((col) => !col.deletedAt),
      };
    } else {
      logger.error(
        "Collection doesn't belong to user",
        collectionId,
        userEmail
      );
      return {
        collections: collections,
        activeCollections: collections.filter((col) => !col.deletedAt),
      };
    }
  } catch (e) {
    logger.error("Failed to delete collection: ", userEmail, collectionId, e);
    throw new Error("Failed to delete collection");
  }
};

export const verifyCollection = async ({ collectionId, userEmail }) => {
  try {
    const { collections, activeCollections } = await fetchCollections(
      userEmail
    );
    let collection = activeCollections.find(
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
      activeCollections,
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
        activeCollections: collections.filter((col) => !col.deletedAt),
        currentPlan: data.currentPlan || FREE_TIER,
        queryInfo: data.queryInfo,
      };
    }
    throw new Error("No collection found for the user");
  } catch (e) {
    logger.error("Failed to fetch collections ", userEmail, e);
    throw new Error("Failed to fetch collections");
  }
};

export const fetchDashboardStatistics = async (userEmail) => {
  try {
    const userRef = doc(db, `users/${userEmail}`);
    const userDoc = await get;
  } catch (error) { }
};

export const updateUser = async ({ userEmail, ...rest }) => {
  try {
    const userRef = doc(db, `users/${userEmail}`);
    await updateDoc(userRef, {
      ...rest,
    });
  } catch (e) {
    logger.error("Failed to update user ", userEmail, rest, e);
    throw new Error("Failed to update user");
  }
};

export const fetchQueryInfo = async ({ userEmail }) => {
  try {
    const userRef = doc(db, `users/${userEmail}`);
    const userDoc = await getDoc(userRef);
    let queryInfo = {};
    if (userDoc.exists()) {
      queryInfo = (await userDoc.data()["queryInfo"]) || {};
    }
    return queryInfo;
  } catch (e) {
    logger.error("Failed to fetch query Info", userEmail, e);
    throw new Error("Failed to fetch query Info");
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
    currentObj[key] = obj[key]
  })
  return currentObj;
}


export const fetchPlanList = async () => {
  const planToDisplay = pick(['free_tier', 'plus_tier'], plans);

  let displayToFe = [];
  for (let plan in planToDisplay) {
    let currentPlan = planToDisplay[plan];
    let pricing = currentPlan.pricing;
    let planOfLocation = pricing['in'];
    let valuesToPick = ['planName', 'primaryText', 'amount', 'duration', 'currency', 'features'];
    let currentObj = pick(valuesToPick, planOfLocation);
    displayToFe.push(currentObj);
  }
  return displayToFe;
}