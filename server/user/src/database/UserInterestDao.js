import pool from '../database/db.js';

const userInterestDb = "UserInterest";
const userIdCol = "user_id";
const interestCol = "interest";

export async function addUserInterest(userId, interestArr) {
    try {
        for (let x in interestArr) {
            const result = await pool.query("INSERT INTO " + userInterestDb + "(" + userIdCol + ", " + interestCol +
                    ") VALUES ($1, $2) ON CONFLICT DO NOTHING;", [userId, interestArr[x]]);
        }
        return "OK";
    } catch (err) {
        throw err;
    }
}

export async function deleteUserInterest(userId, interestArr) {
    try {
        for (let x in interestArr) {
            const result = await pool.query("DELETE FROM " + userInterestDb +
                    " WHERE " + userIdCol + " = $1 AND " + interestCol + " = $2;", [userId, interestArr[x]]);
        }
        return "OK";
    } catch (err) {
        throw err;
    }
}

export async function getUserInterest(userId) {
    try {
        const result = await pool.query("SELECT " + interestCol + " FROM " + userInterestDb +
                " WHERE  " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function clearUserInterest(userId) {
    try {
        const result = await pool.query("DELETE FROM " + userInterestDb +
                " WHERE  " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}