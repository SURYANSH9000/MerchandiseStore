import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBiDvLfkzonDHeCKFIih5BO5Au6yP5KOBQ",
  authDomain: "merchandisestore-a1857.firebaseapp.com",
  projectId: "merchandisestore-a1857",
  storageBucket: "merchandisestore-a1857.appspot.com",
  messagingSenderId: "792890360136",
  appId: "1:792890360136:web:24bcee9d59f5effeb3b37d",
  measurementId: "G-VS32GJH5LZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { auth, firestore, database };