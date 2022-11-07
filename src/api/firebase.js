// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
export const database = getDatabase(firebase);
export const auth = getAuth(firebase);
export const storage = getStorage(firebase);
export const firestore = getFirestore(firebase);

// const firebaseConfig = {
//   apiKey: "AIzaSyB4VBk4HX7XB51poHgvp3vqWdNME1YViTc",
//   authDomain: "gb-react-chat-ede59.firebaseapp.com",
//   databaseURL: "https://gb-react-chat-ede59-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "gb-react-chat-ede59",
//   storageBucket: "gb-react-chat-ede59.appspot.com",
//   messagingSenderId: "798570489719",
//   appId: "1:798570489719:web:8be0ca95c5ffabf3eda372",
//   measurementId: "G-ZSER988XGK"
// };