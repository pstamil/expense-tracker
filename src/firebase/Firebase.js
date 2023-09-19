import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuif5mKJZpjMS7ZJUh0BWVYqdqqJ47Sb8",
  authDomain: "expense-tracker-81e1d.firebaseapp.com",
  projectId: "expense-tracker-81e1d",
  storageBucket: "expense-tracker-81e1d.appspot.com",
  messagingSenderId: "425961339300",
  appId: "1:425961339300:web:788b5a873dc94c77956931",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

const db = getFirestore();

export { db };
