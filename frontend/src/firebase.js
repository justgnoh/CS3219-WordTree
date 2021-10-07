import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAYsPoQAOnfBuPcx-TM2hceDs5R1s3c8Dc",
    authDomain: "wordsquirrel-9320a.firebaseapp.com",
    projectId: "wordsquirrel-9320a",
    storageBucket: "wordsquirrel-9320a.appspot.com",
    messagingSenderId: "385201936185",
    appId: "1:385201936185:web:8e805913d7ec518708fae8",
    measurementId: "G-CS18SL2KMP"
  };

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

// Sign in by Username & Password
const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

// Register with Email & Password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await db.collection("users").add({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    //   TODO: Add entry to GCP UserAccount table
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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
const logout = () => {
    auth.signOut();
};

export {
    auth,
    db,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
};