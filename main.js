// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGHl_2z55l1ecUm4ZQjQDanLN-BR20Yig",
  authDomain: "a1green9code9ondas9-d8a4cc0f.firebaseapp.com",
  projectId: "a1green9code9ondas9-d8a4cc0f",
  storageBucket: "a1green9code9ondas9-d8a4cc0f.firebasestorage.app",
  messagingSenderId: "775689725361",
  appId: "1:775689725361:web:901e9b620b0a2467c50990"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);