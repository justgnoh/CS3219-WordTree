import pool from '../database/db.js';

const interestDb = "Interest";
const interestCol = "interest";

export async function getInterest() {
    try {
        const result = await pool.query("SELECT * FROM " + interestDb + ";");
        return result;
    } catch (err) {
        throw err;
    }
}
