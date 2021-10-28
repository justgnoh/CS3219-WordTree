import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs'
import { serviceAccount } from '../config/index.js'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://fbauthdemo-2a451.firebaseio.com"
});

export const verifyToken = async (idToken) => {
    console.log(idToken)
    admin.auth().verifyIdToken(idToken).then(res => {
        console.log(res.uid)
    })
    // const user = await auth.signInWithCustomToken(auth.getAuth(), idToken)
    // .then((decodedToken) => {
    //     const uid = decodedToken.uid;
    //     return uid;
    // })
    // .catch((error) => {
    //     return error;
    // });
}
