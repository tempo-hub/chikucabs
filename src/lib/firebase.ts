import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnxek3NIBc68WO2L11OmAgMUABu2aUbhc",
  authDomain: "geogoinfotechpro.firebaseapp.com",
  projectId: "geogoinfotechpro",
  // apiKey: "AIzaSyDzSA5GN-WjmJrLCxXnY5GuJYqPAmHFH18",
  // authDomain: "project1-da245.firebaseapp.com",
  // projectId: "project1-da245",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);