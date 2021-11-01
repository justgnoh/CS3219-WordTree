// ! DEPRECATED
// export const SQL_QUERIES = {
//     GET_CHALLENGES_BY_USER_ID: "SELECT * FROM Challenges WHERE squirrel_iD = $1 OR racoon_id = $1",
//     INSERT_NEW_CHALLENGE: "insert into Challenges (squirrel_id, num_of_total_turns, word_limit_per_turn, genre) values ($1, $2, $3, $4) RETURNING challenge_id",
//     INSERT_NEW_TURN_DETAILS: "insert into TurnDetails(challenge_id) values ($1)",
//     GET_CHALLENGE_BY_CHALLENGE_ID: "SELECT * FROM Challenges c WHERE c.challenge_id = $1",
//     GET_NUM_OF_COMPLETED_TURNS_FOR_CHALLENGE: "SELECT num_of_sequences_completed FROM TurnDetails t WHERE t.challenge_id = $1",
//     UPDATE_TURN_DETAILS_TIMESTAMP: "UPDATE TurnDetails SET time_of_last_completed_sequence = CURRENT_TIMESTAMP  WHERE challenge_id = $1",
//     UPDATE_TURN_DETAILS_SEQUENCE_NUM: "UPDATE TurnDetails SET num_of_sequences_completed = num_of_sequences_completed + 1 WHERE challenge_id = $1",
//     GET_PLAYER_ID_IN_CHALLENGE: "SELECT (squirrel_id, racoon_id) FROM Challenges c WHERE c.challenge_id = $1",
// }

