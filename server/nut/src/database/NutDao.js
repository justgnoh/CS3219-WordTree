import pool from '../database/db.js';

const userAccountDb = "UserAccount";
const nutDb = "EssayNut";
const idCol = "id";
const userIdCol = "user_id";
const nutCol = "nut";
const seqNumCol = "seq_num";
const challengeIdCol = "challenge_id";

export async function addNut(userId, nut, challengeId, seqNum) {
    try {
        const result = await pool.query("INSERT INTO " + nutDb +
                "(" + userIdCol + ", " + nutCol + ", " + challengeIdCol + ", " + seqNumCol +
                ") VALUES ($1, $2, $3, $4);", [userId, nut, challengeId, seqNum]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteNut(userId, challengeId, seqNum) {
    try {
        const result = await pool.query("DELETE FROM " + nutDb +
                " WHERE " + userIdCol + " = $1 AND " + challengeIdCol + " = $2 AND " + seqNumCol + " = $3;",
                [userId, challengeId, seqNum]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function viewUserNut(userId) {
    try {
        const result = await pool.query("SELECT * FROM " + nutDb +
                " WHERE  " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getTotalNut(userId) {
    try {
        const result = await pool.query("SELECT SUM (" + nutCol + ") FROM " + nutDb +
                " WHERE " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}