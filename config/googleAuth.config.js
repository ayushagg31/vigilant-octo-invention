import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD9C8SrcW07toCPozlssKE1LRKsTiQUmiY",
  authDomain: "doc-insights-d1cac.firebaseapp.com",
  projectId: "doc-insights-d1cac",
  storageBucket: "doc-insights-d1cac.appspot.com",
  messagingSenderId: "312514846880",
  appId: "1:312514846880:web:a0b2b732d07666908129c5",
  measurementId: "G-SHEMN52342",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// logEvent(analytics, 'notification_received');
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
