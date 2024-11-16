// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'; // 追加
import { getFirestore } from 'firebase/firestore'; // 追加

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDER6ElsExX02qt4HZP85k_v6bZQfQVwWk',
  authDomain: 'cloudmemo-c5e43.firebaseapp.com',
  projectId: 'cloudmemo-c5e43',
  storageBucket: 'cloudmemo-c5e43.firebasestorage.app',
  messagingSenderId: '750259018806',
  appId: '1:750259018806:web:380f7763a261121ad98c97',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 追加
export const db = getFirestore(app); // 追加
