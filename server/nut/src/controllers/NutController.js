import axios from 'axios';
import * as nutDao from "../database/NutDao.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const ERROR_NO_NUT = "Bad Request. No nut found.";
const ERROR_NO_CHALLENGE_ID = "Bad Request. No challenge id found.";
const ERROR_NO_SEQ_NUM = "Bad Request. No sequence number found.";
const ERROR_NO_UPVOTER_USER_ID = "Bad Request. No upvoter user id found.";
const ERROR_NO_UPVOTED_USER_ID = "Bad Request. No upvoted user id found.";

export async function addEssayNut(req, res) {
    console.log("addEssayNut: ", req.body);
    const data = req.body;
    if (data == undefined) {
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
    console.log("deleteEssayNut: ", req.body);
    const data = req.body;
    if (data == undefined) {
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
    console.log("addCommunityChallengeNut: ", req.body);
    const data = req.body;
    if (data == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.upvoterUserId) {
        return res.status(400).send(ERROR_NO_UPVOTER_USER_ID);
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

    await nutDao.addCommunityChallengeNut(data.upvoterUserId, data.upvotedUserId1, data.upvotedUserId2, data.challengeId)
        .then(result => {
            updateProfileTotalNut(data.upvotedUserId1);
            updateProfileTotalNut(data.upvotedUserId2);
            res.status(200).send("OK");
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteCommunityChallengeNut(req, res) {
    console.log("deleteCommunityChallengeNut: ", req.body);
    const data = req.body;
    if (data == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.upvoterUserId) {
        return res.status(400).send(ERROR_NO_UPVOTER_USER_ID);
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

    await nutDao.deleteCommunityChallengeNut(data.upvoterUserId, data.challengeId)
        .then(result1 => {
            updateProfileTotalNut(data.upvotedUserId1);
            updateProfileTotalNut(data.upvotedUserId2);
            res.status(200).send("OK");
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function addCommunityEssayNut(req, res) {
    console.log("addCommunityEssayNut: ", req.body);
    const data = req.body;
    if (data == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.upvoterUserId) {
        return res.status(400).send(ERROR_NO_UPVOTER_USER_ID);
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

    await nutDao.addCommunityEssayNut(data.upvoterUserId, data.upvotedUserId, data.challengeId, data.seqNum)
        .then(result => {
            updateProfileTotalNut(data.upvotedUserId);
            res.status(200).send("OK");
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteCommunityEssayNut(req, res) {
    console.log("deleteCommunityEssayNut: ", req.body);
    const data = req.body;
    if (data == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.upvoterUserId) {
        return res.status(400).send(ERROR_NO_UPVOTER_USER_ID);
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

    await nutDao.deleteCommunityEssayNut(data.upvoterUserId, data.challengeId, data.seqNum)
        .then(result1 => {
            updateProfileTotalNut(data.upvotedUserId);
            res.status(200).send("OK");
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function viewUserNut(req, res) {
    console.log("viewUserNut: ", req.params);
    const userId = req.params.userId;
<<<<<<< HEAD
    
    await nutDao.viewUserNut(userId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
=======

    try {
        const essayNut = await nutDao.getEssayNut(userId);
        const communityChallengeNut = await nutDao.getCommunityChallengeNut(userId);
        const communityEssayNut = await nutDao.getCommunityEssayNut(userId);

        const userNut = essayNut.rows.concat(communityChallengeNut.rows.concat(communityEssayNut.rows));
        res.status(200).json(userNut);
    } catch (err) {
        res.status(500).send(err.message);
    }
>>>>>>> master
}

export async function getUserTotalNut(req, res) {
    console.log("getUserTotalNut: ", req.params);
    const userId = req.params.userId;

    try {
        const totalEssayNut = await nutDao.getTotalEssayNut(userId);
        const totalCommunityChallengeNut = await nutDao.getTotalCommunityChallengeNut(userId);
        const totalCommunityEssayNut = await nutDao.getTotalCommunityEssayNut(userId);

        const userTotalNut = parseInt(totalEssayNut.rows[0].total) + parseInt(totalCommunityChallengeNut.rows[0].total) +
                parseInt(totalCommunityEssayNut.rows[0].total);
        axios.put('http://localhost:5010/user/updateUserTotalNut', { userId: userId, totalNut: userTotalNut });
        res.status(200).json(userTotalNut);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateProfileTotalNut(userId) {
    console.log("(internal) updateProfileTotalNut: ", userId);

    try {
        const totalEssayNut = await nutDao.getTotalEssayNut(userId);
        const totalCommunityChallengeNut = await nutDao.getTotalCommunityChallengeNut(userId);
        const totalCommunityEssayNut = await nutDao.getTotalCommunityEssayNut(userId);

        const userTotalNut = parseInt(totalEssayNut.rows[0].total) + parseInt(totalCommunityChallengeNut.rows[0].total) +
                parseInt(totalCommunityEssayNut.rows[0].total);
        axios.put('http://localhost:5010/user/updateUserTotalNut', { userId: userId, totalNut: userTotalNut });
    } catch (err) {
        return err;
    }
}