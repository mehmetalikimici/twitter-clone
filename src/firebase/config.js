// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCCkqAjITrKZ44iProAEjr3yoRhdodO8Z8',
  authDomain: 'twitter-clone-68252.firebaseapp.com',
  projectId: 'twitter-clone-68252',
  storageBucket: 'twitter-clone-68252.appspot.com',
  messagingSenderId: '343107757282',
  appId: '1:343107757282:web:7de7cf32da801ffcb2eabb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth yapısının referansı
export const auth = getAuth(app);

//google sağlayıcısının referansı
export const provider = new GoogleAuthProvider();

//veritabanı referansı al
export const db = getFirestore(app);

//storage'ın referansını al
export const storage = getStorage(app);
