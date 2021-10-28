import pool from '../database/db.js';

const userInterestDb = "UserInterest";
const userIdCol = "user_id";
const interestCol = "interest";

export async function addUserInterest(userId, interest) {
    try {
        const result = await pool.query("INSERT INTO " + userInterestDb +
                "(" + userIdCol + ", " + interestCol + ") VALUES ($1, $2);", [userId, interest]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteUserInterest(userId, interest) {
    try {
        const result = await pool.query("DELETE FROM " + userInterestDb +
                " WHERE " + userIdCol + " = $1 AND " + interestCol + " = $2;", [userId, interest]);
        return result;
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