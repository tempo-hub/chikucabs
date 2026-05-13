import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnxek3NIBc68WO2L11OmAgMUABu2aUbhc",
  authDomain: "geogoinfotechpro.firebaseapp.com",
  projectId: "geogoinfotechpro",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);