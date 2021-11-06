import axios from 'axios';
import * as nutDao from "../database/NutDao.js";

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
        .then(result => {
            updateProfileTotalNut(data.userId);
            res.status(200).send("OK");
        })
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
        .then(result1 => {
            updateProfileTotalNut(data.userId);
            res.status(200).send("OK");
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function addCommunityChallengeNut(req, res) {
    console.log("Nut Service: (POST) /addCommunityChallengeNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
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
        .then(result => {
            updateProfileTotalNut(data.upvotedUserId1);
            updateProfileTotalNut(data.upvotedUserId2);
            res.status(200).send("OK");
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteCommunityChallengeNut(req, res) {
    console.log("Nut Service: (DELETE) /deleteCommunityChallengeNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
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
        .then(result1 => {
            updateProfileTotalNut(data.upvotedUserId1);
            updateProfileTotalNut(data.upvotedUserId2);
            res.status(200).send("OK");
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function addCommunityEssayNut(req, res) {
    console.log("Nut Service: (POST) /addCommunityEssayNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
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
        .then(result => {
            updateProfileTotalNut(data.upvotedUserId);
            res.status(200).send("OK");
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteCommunityEssayNut(req, res) {
    console.log("Nut Service: (DELETE) /deleteCommunityEssayNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
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
        .then(result1 => {
            updateProfileTotalNut(data.upvotedUserId);
            res.status(200).send("OK");
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function viewUserNut(req, res) {
    console.log("Nut Service: (GET) /viewUserNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const essayNut = await nutDao.getEssayNut(reqUserId);
        const communityChallengeNut = await nutDao.getCommunityChallengeNut(reqUserId);
        const communityEssayNut = await nutDao.getCommunityEssayNut(reqUserId);

        const userNut = essayNut.rows.concat(communityChallengeNut.rows.concat(communityEssayNut.rows));
        res.status(200).json(userNut);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUserTotalNut(req, res) {
    console.log("Nut Service: (GET) /getUserTotalNut");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const totalEssayNut = await nutDao.getTotalEssayNut(reqUserId);
        const totalCommunityChallengeNut = await nutDao.getTotalCommunityChallengeNut(reqUserId);
        const totalCommunityEssayNut = await nutDao.getTotalCommunityEssayNut(reqUserId);

        const userTotalNut = parseInt(totalEssayNut.rows[0].total) + parseInt(totalCommunityChallengeNut.rows[0].total) +
                parseInt(totalCommunityEssayNut.rows[0].total);
        axios.put('http://user-service:80/user/updateUserTotalNut', { userId: reqUserId, totalNut: userTotalNut })
            .catch(err => { /* do nothing */ });
        res.status(200).json(userTotalNut);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateProfileTotalNut(userId) {
    console.log("Nut Service: (internal) updateProfileTotalNut");

    try {
        const totalEssayNut = await nutDao.getTotalEssayNut(userId);
        const totalCommunityChallengeNut = await nutDao.getTotalCommunityChallengeNut(userId);
        const totalCommunityEssayNut = await nutDao.getTotalCommunityEssayNut(userId);

        const userTotalNut = parseInt(totalEssayNut.rows[0].total) + parseInt(totalCommunityChallengeNut.rows[0].total) +
                parseInt(totalCommunityEssayNut.rows[0].total);
        axios.put('http://user-service:80/user/updateUserTotalNut', { userId: reqUserId, totalNut: userTotalNut })
            .catch(err => { /* do nothing */ });
    } catch (err) {
        return err;
    }
}