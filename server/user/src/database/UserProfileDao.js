import pool from '../database/db.js';

const userProfileDb = "UserProfile";
const userInterestDb = "UserInterest";
const userIdCol = "user_id";
const nameCol = "name";
const interestCol = "interest";

export async function createUserProfile(userId, name) {
    try {
        const result = await pool.query("INSERT INTO " + userProfileDb +
                "(" + userIdCol + ", " + nameCol + ") VALUES ($1, $2);", [userId, name]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getUserProfile(userId) {
    try {
        const result = await pool.query("SELECT * FROM " + userProfileDb +
                " WHERE " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getUserInterest(userId) {
    try {
        const result = await pool.query("SELECT * FROM " + userInterestDb +
                " WHERE  " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteUserInterest(userId, interest) {
    try {
        const result = await pool.query("DELETE FROM " + userProfileDb +
                " WHERE " + userIdCol + " = $1 AND " + interestCol + " = $2;", [userId, interest]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function addUserInterest(userId, interest) {
    try {
        const result = await pool.query("INSERT INTO " + userProfileDb +
                "(" + userIdCol + ", " + interestId + ") VALUES ($1, $2);", [userId, interest]);
        return result;
    } catch (err) {
        throw err;
    }
}