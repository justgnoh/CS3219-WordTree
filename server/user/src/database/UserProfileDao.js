import pool from '../database/db.js';

const userProfileDb = "UserProfile";
const userIdCol = "user_id";
const nameCol = "user_name";
const totalNutCol = "total_nut";
const dateOfBirthCol = "date_of_birth";

export async function createUserProfile(userId, name, dateOfBirth) {
    try {
        const result = await pool.query("INSERT INTO " + userProfileDb +
                "(" + userIdCol + ", " + nameCol + ", " + dateOfBirthCol + ") VALUES ($1, $2, $3);",
                [userId, name, dateOfBirth]);
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

export async function updateUserName(userId, name, dateOfBirth) {
    try {
        const result = await pool.query("UPDATE " + userProfileDb +
                " SET " + nameCol + " = $1, " + dateOfBirthCol + " = $2 WHERE " + userIdCol + " = $3;",
                [name, dateOfBirth, userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function updateUserTotalNut(userId, totalNut) {
    try {
        const result = await pool.query("UPDATE " + userProfileDb +
                " SET " + totalNutCol + " = $1 WHERE " + userIdCol + " = $2;", [totalNut, userId]);
        return result;
    } catch (err) {
        throw err;
    }
}
