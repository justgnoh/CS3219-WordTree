import pool from '../database/db.js';

const essayNutDb = "EssayNut";
const communityChallengeNutDb = "CommunityChallengeNut";
const communityEssayNutDb = "CommunityEssayNut";
const userIdCol = "user_id";
const nutCol = "nut";
const seqNumCol = "seq_num";
const challengeIdCol = "challenge_id";
const upvoterUserIdCol = "upvoter_user_id";
const upvotedUserIdCol = "upvoted_user_id";

export async function addEssayNut(userId, nut, challengeId, seqNum) {
    try {
        const result = await pool.query("INSERT INTO " + essayNutDb +
                "(" + userIdCol + ", " + nutCol + ", " + challengeIdCol + ", " + seqNumCol +
                ") VALUES ($1, $2, $3, $4);", [userId, nut, challengeId, seqNum]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteEssayNut(userId, challengeId, seqNum) {
    try {
        const result = await pool.query("DELETE FROM " + essayNutDb +
                " WHERE " + userIdCol + " = $1 AND " + challengeIdCol + " = $2 AND " + seqNumCol + " = $3;",
                [userId, challengeId, seqNum]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function addCommunityChallengeNut(upvoterUserId, upvotedUserId1, upvotedUserId2, challengeId) {
    try {
        const result = await pool.query("INSERT INTO " + communityChallengeNutDb +
                "(" + upvoterUserIdCol + ", " + upvotedUserIdCol + ", " + challengeIdCol +
                ") VALUES ($1, $2, $3), ($1, $4, $3);",
                [upvoterUserId, upvotedUserId1, challengeId, upvotedUserId2]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteCommunityChallengeNut(upvoterUserId, challengeId) {
    try {
        const result = await pool.query("DELETE FROM " + communityChallengeNutDb +
                " WHERE " + upvoterUserIdCol + " = $1 AND " + challengeIdCol + " = $2;",
                [upvoterUserId, challengeId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function addCommunityEssayNut(upvoterUserId, upvotedUserId, challengeId, seqNum) {
    try {
        const result = await pool.query("INSERT INTO " + communityEssayNutDb +
                "(" + upvoterUserIdCol + ", " + upvotedUserIdCol + ", " + challengeIdCol + ", " + seqNumCol +
                ") VALUES ($1, $2, $3, $4);", [upvoterUserId, upvotedUserId, challengeId, seqNum]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteCommunityEssayNut(upvoterUserId, challengeId, seqNum) {
    try {
        const result = await pool.query("DELETE FROM " + communityEssayNutDb +
                " WHERE " + upvoterUserIdCol + " = $1 AND " + challengeIdCol + " = $2 AND " + seqNumCol + " = $3;",
                [upvoterUserId, challengeId, seqNum]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getEssayNut(userId) {
    try {
        const result = await pool.query("SELECT * FROM " + essayNutDb +
                " WHERE  " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getCommunityChallengeNut(userId) {
    try {
        const result = await pool.query("SELECT * FROM " + communityChallengeNutDb +
                " WHERE  " + upvotedUserIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getCommunityEssayNut(userId) {
    try {
        const result = await pool.query("SELECT * FROM " + communityEssayNutDb +
                " WHERE  " + upvotedUserIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getTotalEssayNut(userId) {
    try {
        const result = await pool.query("SELECT COALESCE( SUM(" + nutCol + "), 0) AS TOTAL FROM " + essayNutDb +
                " WHERE " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

 export async function getTotalCommunityChallengeNut(userId) {
    try {
        const result = await pool.query("SELECT COALESCE( SUM(" + nutCol + "), 0) AS TOTAL FROM " + communityChallengeNutDb +
                " WHERE " + upvotedUserIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

 export async function getTotalCommunityEssayNut(userId) {
    try {
        const result = await pool.query("SELECT COALESCE( SUM(" + nutCol + "), 0) AS TOTAL FROM " + communityEssayNutDb +
                " WHERE " + upvotedUserIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}