import pool from '../database/db.js';

const listChallengeQuery = "SELECT ca.challenge_id, title, ca.squirrel_id, ca.racoon_id, s.user_name AS squirrel_name, r.user_name AS racoon_name, num_of_total_turns, word_limit_per_turn, interest, COALESCE(upvotes, 0) AS upvotes, upvoter_user_id AS upvoted " +
        "FROM Challenges AS ca " +
        "LEFT JOIN (SELECT DISTINCT challenge_id, COUNT(*) AS upvotes FROM CommunityChallengeNut GROUP BY challenge_id, upvoter_user_id) AS co ON co.challenge_id = ca.challenge_id " +
        "LEFT JOIN (SELECT challenge_id, upvoter_user_id FROM CommunityChallengeNut WHERE upvoter_user_id = $1) AS ci ON ca.challenge_id = ci.challenge_id " +
        "LEFT JOIN (SELECT user_id, user_name FROM UserProfile) AS s ON ca.squirrel_id = s.user_id " +
        "LEFT JOIN (SELECT user_id, user_name FROM UserProfile) as r ON ca.racoon_id = r.user_id " +
        "WHERE status_of_challenge = 'COMPLETED' " +
        "GROUP BY ca.challenge_id, s.user_name, r.user_name, upvotes, upvoter_user_id ORDER BY ca.challenge_id DESC LIMIT $2 OFFSET $3;";


const getChallengeDetailsQuery = "SELECT ca.challenge_id, title, squirrel_id, racoon_id, num_of_total_turns, word_limit_per_turn, interest, COALESCE(upvotes, 0) AS upvotes, upvoter_user_id AS upvoted " +
        "FROM Challenges AS ca " +
        "LEFT JOIN (SELECT DISTINCT challenge_id, COUNT(*) AS upvotes FROM CommunityChallengeNut GROUP BY challenge_id, upvoter_user_id) AS co ON co.challenge_id = ca.challenge_id " +
        "LEFT JOIN (SELECT challenge_id, upvoter_user_id FROM CommunityChallengeNut WHERE upvoter_user_id = $1) AS ci ON co.challenge_id = ci.challenge_id " +
        "WHERE ca.challenge_id = $2 GROUP BY ca.challenge_id, upvoter_user_id, co.upvotes;";

const getEssayParaDetailsQuery = "SELECT e.challenge_id, e.seq_num, author_id, essay_para, words_used, COALESCE(upvotes, 0) AS upvotes, upvoter_user_id AS upvoted " +
        "FROM EssayPara AS e " +
        "LEFT JOIN (SELECT challenge_id, seq_num, COUNT(*) AS upvotes FROM CommunityEssayNut GROUP BY challenge_id, seq_num) AS c ON e.challenge_id = c.challenge_id AND e.seq_num = c.seq_num " +
        "LEFT JOIN (SELECT challenge_id, seq_num, upvoter_user_id FROM CommunityEssayNut WHERE upvoter_user_id = $1) AS ci ON e.challenge_id = ci.challenge_id AND e.seq_num = ci.seq_num " +
        "WHERE e.challenge_id = $2 GROUP BY e.challenge_id, e.seq_num, upvoter_user_id, upvotes;";

const getChallengeUserDetailsQuery = "SELECT * FROM UserProfile WHERE user_id = $1 OR user_id = $2;";

const checkChallengeQuery = "SELECT COUNT(*) FROM Challenges WHERE challenge_id = $1 AND status_of_challenge = 'COMPLETED';";

export async function listChallenges(userId, limit, offset) {
    try {
        const result = await pool.query(listChallengeQuery, [userId, limit, offset]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getChallengeDetails(userId, challengeId) {
    try {
        const result = await pool.query(getChallengeDetailsQuery, [userId, challengeId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getEssayParaDetails(userId, challengeId) {
    try {
        const result = await pool.query(getEssayParaDetailsQuery, [userId, challengeId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getChallengeUserDetails(squirrelId, racoonId) {
    try {
        const result = await pool.query(getChallengeUserDetailsQuery, [squirrelId, racoonId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function checkChallenge(challengeId) {
    try {
        const result = await pool.query(checkChallengeQuery, [challengeId]);
        return result;
    } catch (err) {
        throw err;
    }
}
