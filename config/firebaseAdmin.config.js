import admin from "firebase-admin";
import serviceAccount from "../servicekey.json" assert { type: "json" };


if (!admin.apps.length) {
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
