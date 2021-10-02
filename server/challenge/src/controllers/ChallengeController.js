import express from 'express';
import pool from '../database/db';
import {SQL_QUERIES} from '../database/sql_queries';

class ChallengeController {
    async getAllChallengeByUserId(req, res) {
        const userID = req.query.userid;
        if (req.query.userid === undefined) {
            return res.status(400).send("Bad Request. No User ID Provided")
        }
        const challenge = await pool.query(SQL_QUERIES.getChallengeByUserID, [userID]);
        res.json(challenge.rows);
        res.status(200)
    }
    async createNewChallenge(req, res) {
        const data = req.body;
        if (data === undefined) return res.status(400).send("Bad Request. No data found.")
        if (!data.squirrel_id) return res.status(400).send("Bad Request. No userID found.")
        if (!data.num_of_total_turns) return res.status(400).send("Bad Request. No num_of_total_turns found.")
        if (data.num_of_total_turns !== 4 && data.num_of_total_turns !== 6  ) return res.status(400).send("Bad Request. Invalid number for num_of_total_turns found.")
        if (!data.word_limit_per_turn) return res.status(400).send("Bad Request. No word_limit_per_turn found.")
        if (data.word_limit_per_turn !== 300 && data.word_limit_per_turn !== 500  ) return res.status(400).send("Bad Request. Invalid number for word_limit_per_turn found.")
        if (!data.genre) return res.status(400).send("Bad Request. No genre found.")

        await pool.query(SQL_QUERIES.insertChallenge, [data.squirrel_id, data.num_of_total_turns, data.word_limit_per_turn, data.genre]).then(
            () => res.status(200).send("OK")
        ).catch(err => {
            if (err.constraint !== undefined) {
                if (err.constraint.includes("challenges_genre_fkey") > 0) {
                    return res.status(400).send("Bad Request. Genre not found")
                }
            } else {
                return res.status(500).send(err.message)
            }
        })
    }
}

export default new ChallengeController();