import pool from '../database/db.js';

const userAccountDb = "UserAccount";
const userIdCol = "user_id";
const emailCol = "email";
const passwordCol = "password";

export async function createUserAccount(userId, email, password) {
    try {
        const result = await pool.query("INSERT INTO " + userAccountDb +
                "(" + userIdCol + ", " + emailCol + ", " + passwordCol + ") VALUES ($1, $2, $3);",
                [userId, email, password]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function updateUserPassword(userId, password) {
    try {
        const result = await pool.query("UPDATE " + userAccountDb +
                " SET " + passwordCol + " = $1 WHERE " + userIdCol + " = $2;", [password, userId]);
        return result;
    } catch (err) {
        throw err;
    }
}
