import pool from '../database/db.js';

const essayNutDb = "EssayNut";
const communityChallengeNutDb = "CommunityChallengeNut";
const communityEssayNutDb = "CommunityEssayNut";
const userIdCol = "user_id";
const nutCol = "nut";
const seqNumCol = "seq_num";
const challengeIdCol = "challenge_id";

export async function createEssayNut(userId, nut, challengeId, seqNum) {
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

export async function createCommunityChallengeNut(userId, nut, challengeId) {
    try {
        const result = await pool.query("INSERT INTO " + communityChallengeNutDb +
                "(" + userIdCol + ", " + nutCol + ", " + challengeIdCol +
                ") VALUES ($1, $2, $3);", [userId, nut, challengeId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteCommunityChallengeNut(userId, challengeId) {
    try {
        const result = await pool.query("DELETE FROM " + communityChallengeNutDb +
                " WHERE " + userIdCol + " = $1 AND " + challengeIdCol + " = $2;",
                [userId, challengeId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function createCommunityEssayNut(userId, nut, challengeId, seqNum) {
    try {
        const result = await pool.query("INSERT INTO " + communityEssayNutDb +
                "(" + userIdCol + ", " + nutCol + ", " + challengeIdCol + ", " + seqNumCol +
                ") VALUES ($1, $2, $3, $4);", [userId, nut, challengeId, seqNum]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteCommunityEssayNut(userId, challengeId, seqNum) {
    try {
        const result = await pool.query("DELETE FROM " + communityEssayNutDb +
                " WHERE " + userIdCol + " = $1 AND " + challengeIdCol + " = $2 AND " + seqNumCol + " = $3;",
                [userId, challengeId, seqNum]);
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
                " WHERE  " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getCommunityEssayNut(userId) {
    try {
        const result = await pool.query("SELECT * FROM " + communityEssayNutDb +
                " WHERE  " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getTotalEssayNut(userId) {
    try {
        const result = await pool.query("SELECT SUM (" + nutCol + ") FROM " + essayNutDb +
                " WHERE " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

 export async function getTotalCommunityChallengeNut(userId) {
    try {
        const result = await pool.query("SELECT SUM (" + nutCol + ") FROM " + communityChallengeNutDb +
                " WHERE " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

 export async function getTotalCommunityEssayNut(userId) {
    try {
        const result = await pool.query("SELECT SUM (" + nutCol + ") FROM " + communityEssayNutDb +
                " WHERE " + userIdCol + " = $1;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}