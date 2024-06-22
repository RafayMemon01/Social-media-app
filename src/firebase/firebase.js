import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNlt4BxnNpFCq0YNuBiq-T0ZI3Kt5p2DE",
  authDomain: "insta-clone-bfaca.firebaseapp.com",
  projectId: "insta-clone-bfaca",
  storageBucket: "insta-clone-bfaca.appspot.com",
  messagingSenderId: "136038807120",
  appId: "1:136038807120:web:e8eaa2a4e3f74a54c70355",
  measurementId: "G-T4DZ96V1FT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);
export { app, auth, fireStore, storage }