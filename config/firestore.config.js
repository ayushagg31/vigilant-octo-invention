import {
  getFirestore,
  setDoc,
  getDoc,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { app, auth } from "./googleAuth.config";

const db = getFirestore(app);

export const createUser = async () => {
  // Get the currently signed-in user
  const user = auth.currentUser;
  if (user) {
    try {
      const userRef = doc(db, `users/${user.uid}`);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          collections: [],
        });
        console.log("Document written successfully");
      } else {
        console.log("user already exists");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error("Failed to create user", e.message);
    }
  }
};

export const addCollection = async ({
  collectionName,
  ytUrl = null,
  pdfUrl = null,
  fileType,
  userId,
}) => {
  if (userId) {
    try {
      const userRef = doc(db, `users/${userId}`);
      await updateDoc(userRef, {
        collections: arrayUnion({ collectionName, ytUrl, pdfUrl, fileType }),
      });
      console.log("Document updated successfully");
    } catch (e) {
      console.error("Error updating document: ", e);
      throw new Error("Failed to update document");
    }
  }
};
