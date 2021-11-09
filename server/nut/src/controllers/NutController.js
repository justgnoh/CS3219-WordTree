import * as nutDao from "../database/NutDao.js";
import { getAuthenticatedUserId } from "../communications/Authentication.js";
import { updateUserTotalNut } from "../communications/User.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const ERROR_NO_NUT = "Bad Request. No nut found.";
const ERROR_NO_CHALLENGE_ID = "Bad Request. No challenge id found.";
const ERROR_NO_SEQ_NUM = "Bad Request. No sequence number found.";
const ERROR_NO_UPVOTER_USER_ID = "Bad Request. No upvoter user id found.";
const ERROR_NO_UPVOTED_USER_ID = "Bad Request. No upvoted user id found.";
const ERROR_NOT_AUTHENTICATED = "You are not authenticated, please log in and try again.";
const ERROR_NOT_AUTHORIZED = "You are not authorized to perform this action.";

export async function addEssayNut(req, res) {
    console.log("Nut Service: (POST) /addEssayNut");
    const data = req.body;
    if (!data) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!data.nut) {
        return res.status(400).send(ERROR_NO_NUT);
    }
    if (!data.challengeId) {
        return res.status(400).send(ERROR_NO_CHALLENGE_ID);
    }
    if (!data.seqNum) {
        return res.status(400).send(ERROR_NO_SEQ_NUM);
    }

    await nutDao.addEssayNut(data.userId, data.nut, data.challengeId, data.seqNum)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteEssayNut(req, res) {
    console.log("Nut Service: (DELETE) /deleteEssayNut");
    const data = req.body;
    if (!data) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!data.challengeId) {
        return res.status(400).send(ERROR_NO_CHALLENGE_ID);
    }
    if (!data.seqNum) {
        return res.status(400).send(ERROR_NO_SEQ_NUM);
    }

    await nutDao.deleteEssayNut(data.userId, data.challengeId, data.seqNum)
        .then(result1 => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function addCommunityChallengeNut(req, res) {
    console.log("Nut Service: (POST) /addCommunityChallengeNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        var reqUserId = await getAuthenticatedUserId(accessToken);
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    if (!reqUserId) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    const data = req.body;
    if (!data) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.upvotedUserId1) {
        return res.status(400).send(ERROR_NO_UPVOTED_USER_ID);
    }
    if (!data.upvotedUserId2) {
        return res.status(400).send(ERROR_NO_UPVOTED_USER_ID);
    }
    if (!data.challengeId) {
        return res.status(400).send(ERROR_NO_CHALLENGE_ID);
    }

    await nutDao.addCommunityChallengeNut(reqUserId, data.upvotedUserId1, data.upvotedUserId2, data.challengeId)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteCommunityChallengeNut(req, res) {
    console.log("Nut Service: (DELETE) /deleteCommunityChallengeNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        var reqUserId = await getAuthenticatedUserId(accessToken);
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    if (!reqUserId) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    const data = req.body;
    if (!data) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.upvotedUserId1) {
        return res.status(400).send(ERROR_NO_UPVOTED_USER_ID);
    }
    if (!data.upvotedUserId2) {
        return res.status(400).send(ERROR_NO_UPVOTED_USER_ID);
    }
    if (!data.challengeId) {
        return res.status(400).send(ERROR_NO_CHALLENGE_ID);
    }

    await nutDao.deleteCommunityChallengeNut(reqUserId, data.challengeId)
        .then(result1 => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function addCommunityEssayNut(req, res) {
    console.log("Nut Service: (POST) /addCommunityEssayNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        var reqUserId = await getAuthenticatedUserId(accessToken);
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    if (!reqUserId) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    const data = req.body;
    if (!data) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.upvotedUserId) {
        return res.status(400).send(ERROR_NO_UPVOTED_USER_ID);
    }
    if (!data.challengeId) {
        return res.status(400).send(ERROR_NO_CHALLENGE_ID);
    }
    if (!data.seqNum) {
        return res.status(400).send(ERROR_NO_SEQ_NUM);
    }

    await nutDao.addCommunityEssayNut(reqUserId, data.upvotedUserId, data.challengeId, data.seqNum)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteCommunityEssayNut(req, res) {
    console.log("Nut Service: (DELETE) /deleteCommunityEssayNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        var reqUserId = await getAuthenticatedUserId(accessToken);
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    if (!reqUserId) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    const data = req.body;
    if (!data) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.upvotedUserId) {
        return res.status(400).send(ERROR_NO_UPVOTED_USER_ID);
    }
    if (!data.challengeId) {
        return res.status(400).send(ERROR_NO_CHALLENGE_ID);
    }
    if (!data.seqNum) {
        return res.status(400).send(ERROR_NO_SEQ_NUM);
    }

    await nutDao.deleteCommunityEssayNut(reqUserId, data.challengeId, data.seqNum)
        .then(result1 => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getUserNut(req, res) {
    console.log("Nut Service: (GET) /getUserNut");

    const userId = req.params.userId;

    try {
        const essayNut = (await nutDao.getTotalEssayNut(userId)).rows[0].total;
        const communityChallengeNut = (await nutDao.getTotalCommunityChallengeNut(userId)).rows[0].total;
        const communityEssayNut = (await nutDao.getTotalCommunityEssayNut(userId)).rows[0].total;
        const totalNut = parseInt(essayNut) + parseInt(communityChallengeNut) + parseInt(communityEssayNut);
        const userNut = { totalNut: totalNut, essayNut: essayNut, communityChallengeNut: communityChallengeNut, communityEssayNut: communityEssayNut };
        res.status(200).json(userNut);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
