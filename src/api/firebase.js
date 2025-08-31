// src\api\firebase.js

// Firebase configuration and initialization
// Manages authentication and Firestore database

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace these keys with your Firebase project keys
const firebaseConfig = {
  apiKey: "AIzaSyBRaEYaSlhUH3ct6W7WeJM_QL85G9SLFCI",
  authDomain: "job-tracker-7290f.firebaseapp.com",
  projectId: "job-tracker-7290f",
  storageBucket: "job-tracker-7290f.appspot.com",
  messagingSenderId: "688575071431",
  appId: "1:688575071431:web:8d577ae3cb5eeeefe0eae2",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export auth and database instances for reuse
export const auth = getAuth(app);
export const db = getFirestore(app);

