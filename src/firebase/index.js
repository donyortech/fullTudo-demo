import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdIbVm8UeAicM4qbxZSfkUIkvAAqkvusg",
  authDomain: "fir-host-4768b.firebaseapp.com",
  projectId: "fir-host-4768b",
  storageBucket: "fir-host-4768b.appspot.com",
  messagingSenderId: "647572795411",
  appId: "1:647572795411:web:ce753ef9a5c83851ae4fe6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
