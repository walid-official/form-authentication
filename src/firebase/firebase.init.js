// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjeNinAs75cOS5OphZTx8Az3wy7bFJdJg",
  authDomain: "email-password-auth-e3c4c.firebaseapp.com",
  projectId: "email-password-auth-e3c4c",
  storageBucket: "email-password-auth-e3c4c.firebasestorage.app",
  messagingSenderId: "1002059893434",
  appId: "1:1002059893434:web:926d8b79597785446d5083"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);