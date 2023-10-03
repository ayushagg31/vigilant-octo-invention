import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserSessionPersistence, inMemoryPersistence, browserLocalPersistence, getIdToken } from "firebase/auth";

// import dotenv from "dotenv";
// dotenv.config({ path: '.env' })
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_MESSEGING_SENDING_ID,
  appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence);
auth.setPersistence(inMemoryPersistence);
auth.setPersistence(browserLocalPersistence);
const provider = new GoogleAuthProvider();

export { app, auth, provider, getIdToken };
