// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArKK5BbKXoYEZUfqT6_dtO7s8XsCcTGYM",
  authDomain: "bloglogin-d4d00.firebaseapp.com",
  projectId: "bloglogin-d4d00",
  storageBucket: "bloglogin-d4d00.appspot.com",
  messagingSenderId: "286725137663",
  appId: "1:286725137663:web:9ab6a151332d3a883658ca"
};

const authListeners = [];
const currentUser = null;
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreInstance = getFirestore(app);
auth.onAuthStateChanged((user) => {
    authListeners.forEach((listener) => {
        listener(user);
        currentUser = user;
    });
});

export const addAuthListener = (listener) => {
    authListeners.push(listener);
};

export const removeAuthListener = (listener) => {
    const index = authListeners.indexOf(listener);
    if (index > -1) {
        authListeners.splice(index, 1);
    }
};

export const getCurrentUser = () => {
    return currentUser;
};

