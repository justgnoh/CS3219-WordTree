import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createUserAccount } from './utils/Api';

const firebaseConfig = {
    apiKey: "AIzaSyAYsPoQAOnfBuPcx-TM2hceDs5R1s3c8Dc",
    authDomain: "wordsquirrel-9320a.firebaseapp.com",
    projectId: "wordsquirrel-9320a",
    storageBucket: "wordsquirrel-9320a.appspot.com",
    messagingSenderId: "385201936185",
    appId: "1:385201936185:web:8e805913d7ec518708fae8",
    measurementId: "G-CS18SL2KMP"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Sign in by Username & Password
const basicSignIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('User Logged In');
    console.log(user);
    // user.getIdToken(true).then(token => console.log(token))
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};

// Register with Email & Password
const registerWithEmailAndPassword = async (name, email, password, dob) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      console.log(userCredential);
      const user = userCredential.user;
      const userId = userCredential.user.uid;
      const token = await user.getIdToken(true);
      const data = {
        "userId" : userId,
        "email" : email,
        "password" : password,
        "name" : name,
        "dateOfBirth" : dob
      }
      createUserAccount(token, data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Reset Password
const sendPasswordResetEmail = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

// Logout
const logout = async () => {
    auth.signOut();
};

export {
    auth,
    db,
    basicSignIn,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
};