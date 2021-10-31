import express from 'express';
import pool from '../database/db.js';
import {SQL_QUERIES as query} from '../database/sql_queries.js';
import { error_messages, OK_MESSAGE} from '../config/index.js';

export const getAllChallengeByUserId = async (req, res) => {
    const userID = req.query.userid;
    if (req.query.userid === undefined) {
        return res.status(400).send(error_messages.MISSING_FIELDS)
    }
    const challenge = await pool.query(query.GET_CHALLENGES_BY_USER_ID, [userID]);
    return res.status(200).json(challenge.rows);
}

export const createNewChallenge = async (req, res) => {
    const data = req.body;
    if (data === undefined || !data.squirrel_id || !data.num_of_total_turns || !data.word_limit_per_turn || !data.genre) 
        return res.status(400).send(error_messages.MISSING_FIELDS);
    if (data.num_of_total_turns !== 4 && data.num_of_total_turns !== 6  ) return res.status(400).send(error_messages.INVALID_FIELDS);
    if (data.word_limit_per_turn !== 300 && data.word_limit_per_turn !== 500  ) return res.status(400).send(error_messages.INVALID_FIELDS);

    const challenge = await pool.query(query.INSERT_NEW_CHALLENGE, [data.squirrel_id, data.num_of_total_turns, data.word_limit_per_turn, data.genre]).catch(err => {
        if (err.constraint !== undefined) {
            if (err.constraint.includes("fkey") > 0) {
                return res.status(400).send(error_messages.INVALID_FIELDS);
            }
        } 
        return res.status(500).send(err.message);
    })

    if (challenge && challenge.rows && challenge.rows.length > 0 && challenge.rows[0].challenge_id) {
            console.log(challenge.rows[0].challenge_id);
            return await pool.query(query.INSERT_NEW_TURN_DETAILS, [challenge.rows[0].challenge_id])
            // TODO get words from word service
            .then(() => res.status(200).send("OK"))
            .catch(err => {
                console.log(err);
                return res.status(500).send(error_messages.INTERNAL_ERROR)
            });
    }
}

export const addEssayPara = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    if (!data.player_id) return res.status(400).send(error_messages.MISSING_FIELDS);
    if (!data.essay_para) return res.status(400).send(error_messages.MISSING_FIELDS);
    if (isNaN(id)) return res.status(400).send(error_messages.INVALID_FIELDS);

    const allPlayerIDs = await pool.query(query.GET_PLAYER_ID_IN_CHALLENGE, [id]).then(
        (playerIDs) => {
            
            if (playerIDs.rows.length === 0 || playerIDs.rows.length > 1 || !playerIDs.rows[0].row) return [];
            return playerIDs.rows[0].row.match(/\d+/g);
        }
    ).catch(err => {
        return res.status(500).send(err.message);
    })

    if (allPlayerIDs === undefined || allPlayerIDs.length === 0) {
        return res.status(404).send(error_messages.NO_SUCH_CHALLENGE_FOUND);
    }

    const isCorrectPlayerTurn = await pool.query(query.GET_NUM_OF_COMPLETED_TURNS_FOR_CHALLENGE, [id]).then(
        numOfCompletedTurnsRes => {
            if (numOfCompletedTurnsRes.rows && numOfCompletedTurnsRes.rows.length > 0) {
                // Extracting Results
                if (numOfCompletedTurnsRes.rows[0].num_of_sequences_completed !== undefined &&
                    numOfCompletedTurnsRes.rows[0].num_of_sequences_completed % 2 === 0) {
                    //squirrel's turn
                    return allPlayerIDs.indexOf(data.player_id) === 0;
                } 
            } 
            return false;
        }
    ).catch(err => {
        return res.status(500).send(err.message);
    })

    // TODO add essay para from essay service

    if (isCorrectPlayerTurn) {
        await pool.query(query.UPDATE_TURN_DETAILS_TIMESTAMP, [id]).catch(err => {
            return res.status(500).send(err.message);
        })
        await pool.query(query.UPDATE_TURN_DETAILS_SEQUENCE_NUM, [id]).catch(err => {
            return res.status(500).send(err.message);
        })
        return res.status(200).send(OK_MESSAGE)
    } else {
        return res.status(403).send(error_messages.WRONG_TURN);
    }

}

export const getChallengeByChallengeId = async (req, res) => {
    const userID = req.query.userid;
    const { id } = req.params;

    if (!userID) {
        return res.status(400).send(error_messages.MISSING_FIELDS)
    }

    const challenge = await pool.query(query.GET_CHALLENGE_BY_CHALLENGE_ID, [id]);
    if (challenge.rows.length > 1) {
        console.log("Duplicate Challenge ID found");
        return res.status(500).send(error_messages.INTERNAL_ERROR);
    }
    if (challenge.rows[0]['status_of_challenge'] != "COMPLETED" ) {
        if (userID != challenge.rows[0]['squirrel_id'] && userID != challenge.rows[0]['racoon_id']) {
            return res.status(401).send(error_messages.NOT_IN_THIS_CHALLENGE)
        } 
    }

    // TODO Talk to essay service and get all essay para
    return res.status(200).json(challenge.rows[0]);
}