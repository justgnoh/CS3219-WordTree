import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs'
import { serviceAccount } from '../config/index.js'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const verifyToken = async (idToken) => {
    return await admin.auth().verifyIdToken(idToken)
    .then(res => res)
    .catch (err => err)
}
