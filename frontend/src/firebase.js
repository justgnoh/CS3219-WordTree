import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const registerWithEmailAndPassword = async (name, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    // try {
    //   const res = await auth.createUserWithEmailAndPassword(email, password);
    //   const user = res.user;
    //   await db.collection("users").add({
    //     uid: user.uid,
    //     name,
    //     authProvider: "local",
    //     email,
    //   });
    // //   TODO: Add entry to GCP UserAccount table
    // } catch (err) {
    //   console.error(err);
    //   alert(err.message);
    // }
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