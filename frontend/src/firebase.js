import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createUserAccount } from './utils/Api';
import { firebaseConfig } from './env.js';


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Sign in by Username & Password
const basicSignIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((err) => {
    if (err.code === "auth/user-not-found") {
      alert("User is not found!");
    } else if (err.code === "auth/wrong-password") {
      alert("Wrong password!");
    } else {
      alert(err.message);
    }
  });
};

// Register with Email & Password
const registerWithEmailAndPassword = async (name, email, password, dob) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
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
    .catch((err) => {
        if (err.code === "auth/invalid-email") {
          alert("Please fill in a valid email!");
        } else if (err.code === "auth/email-already-in-use") {
          alert("Email is already in use!");
        } else {
          alert(err.message);
        };
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