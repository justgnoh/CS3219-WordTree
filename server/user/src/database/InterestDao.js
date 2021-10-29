import pool from '../database/db.js';

const interestDb = "Interest";
const interestCol = "interest";

export async function addInterest(interest) {
    try {
        const result = await pool.query("INSERT INTO " + interestDb + "(" + interestCol + ") VALUES ($1);", [interest]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteInterest(interest) {
    try {
        const result = await pool.query("DELETE FROM " + interestDb + " WHERE " + interestCol + " = $1;", [interest]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getInterest() {
    try {
        const result = await pool.query("SELECT * FROM " + interestDb + ";");
        return result;
    } catch (err) {
        throw err;
    }
}
