import pool from '../database/db.js';

const userAccountDb = "UserAccount";
const userIdCol = "user_id";
const emailCol = "email";
const passwordCol = "password";

export async function createUserAccount(userId, email) {
    try {
        const result = await pool.query("INSERT INTO " + userAccountDb +
                "(" + userIdCol + ", " + emailCol + ") VALUES ($1, $2);",
                [userId, email]);
        return result;
    } catch (err) {
        throw err;
    }
}
