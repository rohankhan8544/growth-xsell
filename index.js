// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKAmajJnlVIMMoCRCQvxePSUnUTWi8Hr8",
  authDomain: "gen-lang-client-0390082716.firebaseapp.com",
  projectId: "gen-lang-client-0390082716",
  storageBucket: "gen-lang-client-0390082716.firebasestorage.app",
  messagingSenderId: "930295643959",
  appId: "1:930295643959:web:23554a2ad5c08a0acf24b2",
  measurementId: "G-T9E4S5P4G3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
