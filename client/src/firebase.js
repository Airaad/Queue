// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "queue-36b65.firebaseapp.com",
  projectId: "queue-36b65",
  storageBucket: "queue-36b65.appspot.com",
  messagingSenderId: "228520462304",
  appId: "1:228520462304:web:227ab9a9ca1ef52b0fcd85"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);