import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRaEYaSlhUH3ct6W7WeJM_QL85G9SLFCI",
  authDomain: "job-tracker-7290f.firebaseapp.com",
  projectId: "job-tracker-7290f",
  storageBucket: "job-tracker-7290f.appspot.com",
  messagingSenderId: "688575071431",
  appId: "1:688575071431:web:8d577ae3cb5eeeefe0eae2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
