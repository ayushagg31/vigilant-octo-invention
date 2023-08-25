import {
    getFirestore,
    setDoc,
    getDoc,
    arrayUnion,
    doc,
    updateDoc,
    collection,
} from "firebase/firestore";
import { app, auth } from "../config/googleAuth.config";

const COLLECTION_LIMIT = 3;

const db = getFirestore(app);

export const createUser = async (user) => {
    // Get the currently signed-in user
    if (user) {
        try {
            const userRef = doc(db, `users/${user.uid}`);
            const userDoc = await getDoc(userRef);
            const initialDoc = {
                uid: user.uid,
                displayName: user.name,
                email: user.email,
                collections: [],
            };
            if (!userDoc.exists()) {
                await setDoc(userRef, initialDoc);
                console.log("Document written successfully");
            } else {
                console.log("user already exists");
            }
        } catch (e) {
            console.log(e);
            console.error("Failed to create user: ", e);
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
    userId,
}) => {
    try {
        const userRef = doc(db, `users/${userId}`);
        // check if total collection count exceeding the allowed limit
        const collections = await fetchCollections(userId);
        if (collections.length >= COLLECTION_LIMIT) {
            // delete the leastRecentAccessed Collection
            const oldestTimestamp = Math.min(
                ...collections.map((col) => col.lastAccessedTimeStamp)
            );
            const indexOfOldest = collections.findIndex(
                (col) => col.lastAccessedTimeStamp === oldestTimestamp
            );
            const oldestCollection = collection[indexOfOldest];
            if (indexOfOldest !== -1) {
                collections.splice(indexOfOldest, 1);
                await updateDoc(userRef, {
                    collections,
                });
            }
        }
        await updateDoc(userRef, {
            collections: arrayUnion({
                collectionId,
                collectionName,
                ytUrl,
                pdfUrl,
                fileType,
                lastAccessedTimeStamp: Date.now(),
            }),
        });
        console.log("Document updated successfully");
    } catch (e) {
        console.error("Error updating document: ", e);
        throw new Error("Failed to update document");
    }
};

export const updateCollection = async ({
    collectionId,
    userId,
    updatedValue,
}) => {
    try {
        const userRef = doc(db, `users/${userId}`);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const collections = (await userDoc.data()["collections"]) || [];
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
        } else {
            console.error("User doesn't exist in db");
            throw new Error("User doesn't exist in db");
        }
    } catch (e) {
        console.error("Failed to update collection: ", e);
        throw new Error("Failed to update collection");
    }
};

export const verifyCollection = async ({ collectionId, userId }) => {
    try {
        const userRef = doc(db, `users/${userId}`);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const collections = await userDoc.data()["collections"];
            let collection = collections.find(
                (col) => col["collectionId"] === collectionId
            );
            if (collection) {
                await updateCollection({
                    collectionId: collection.collectionId,
                    userId,
                    updatedValue: { lastAccessedTimeStamp: Date.now() },
                });
            }
            return !!collection;
        } else {
            console.error("User doesn't exist in db");
            throw new Error("User doesn't exist in db");
        }
    } catch (e) {
        console.error("Failed to verify collection: ", e);
        throw new Error("Failed to verify collection");
    }
};

export const fetchCollections = async (userId) => {
    try {
        const userRef = doc(db, `users/${userId}`);
        const userDoc = await getDoc(userRef);
        let collections;
        if (userDoc.exists()) {
            collections = (await userDoc.data()["collections"]) || [];
        } else {
            collections = []
        }
        return collections;
    } catch (e) {
        console.error("Failed to fetch collections ", e);
        throw new Error("Failed to fetch collections");
    }
};
