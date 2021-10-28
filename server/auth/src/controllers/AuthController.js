import express from 'express';
import { verifyToken } from '../database/firebase.js';

export const verifyJWTToken = async (req, res) => {
    const reqBody = req.body;
    const uid = verifyToken(reqBody.id);
    console.log(uid);
}