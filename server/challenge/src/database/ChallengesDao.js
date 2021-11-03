import pool from '../database/db.js';

const challengeDb = "Challenges";

export async function addChallenge(squirrel_id, num_of_total_turns, word_limit_per_turn, interest) {
    try {
        const result = await pool.query("INSERT into " + challengeDb + "(squirrel_id, num_of_total_turns, word_limit_per_turn, interest) values ($1, $2, $3, $4) RETURNING challenge_id", [
            squirrel_id, num_of_total_turns, word_limit_per_turn, interest
        ]);
        return result.rows;
    } catch (err) {
        throw err;
    }
}

export async function getPlayersInChallenge(challengeID) {
    try {
        const result = await pool.query("SELECT (squirrel_id, racoon_id) FROM Challenges c WHERE c.challenge_id = $1", [challengeID]).then(
            (playerIDs) => {
                if (playerIDs.rows.length === 0 || playerIDs.rows.length > 1 || !playerIDs.rows[0].row) return [];
                const playerIDString = playerIDs.rows[0].row.match(/\d+/g);
                return playerIDString.map(str => parseInt(str));
            }
        )
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getNumOfCompletedTurnsForChallenge(challengeID) {
    try {
        const result = await pool.query("SELECT num_of_sequences_completed FROM TurnDetails t WHERE t.challenge_id = $1", [challengeID]);
        return result.rows;
    } catch (err) {
        throw err;
    }
}

export async function getChallengeByChallengeIdFromDB(challengeID) {
    try {
        const result = await pool.query("SELECT * FROM Challenges c WHERE c.challenge_id = $1", [challengeID]);
        return result.rows;
    } catch (err) {
        throw err;
    }
}

export async function getChallengeByUserIdFromDB(userID) {
    try {
        const result = await pool.query("SELECT * FROM Challenges WHERE squirrel_iD = $1 OR racoon_id = $1", [userID])
        return result.rows;
    } catch (err) {
        throw err;
    }
}

export async function updateTurnDetails(challengeID) {
    try {
        await pool.query("UPDATE TurnDetails SET time_of_last_completed_sequence = CURRENT_TIMESTAMP  WHERE challenge_id = $1", [challengeID]);
        await pool.query("UPDATE TurnDetails SET num_of_sequences_completed = num_of_sequences_completed + 1 WHERE challenge_id = $1", [challengeID]);
    } catch (err) {
        throw err;
    }
}

export async function insertNewTurnDetails(challengeID) {
    try {
        //Creates a row in the turn table but does not start a turn
        await pool.query("insert into TurnDetails(challenge_id) values ($1)", [challengeID]);
    } catch (err) {
        throw err;
    }
}

export async function getLastModifiedTimeForChallenge(challengeID) {
    try {
        //Creates a row in the turn table but does not start a turn
        const result = await pool.query("Select time_of_last_completed_sequence from TurnDetails where challenge_id = $1", [challengeID]);
        return result.rows;
    } catch (err) {
        throw err;
    }
}