import * as communityDao from "../database/CommunityDao.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_CHALLENGE_ID = "Bad Request. No challenge id found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const DEFAULT_LIMIT = 50;
const DEFAULT_OFFSET = 0;

export async function listChallenges(req, res) {
    console.log("listChallenges: ", req.body);
    const data = req.body;
    let offset = DEFAULT_OFFSET;
    let limit = DEFAULT_LIMIT;

    if (!data.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (data.limit != undefined) {
        limit = data.limit;
    }
    if (data.offset != undefined) {
        offset = data.offset;
    }

    await communityDao.listChallenges(data.userId, limit, offset)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getChallenge(req, res) {
    console.log("getChallenge: ", req.body);
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

    try {
        const challengeDetails = await communityDao.getChallengeDetails(data.userId, data.challengeId);
        const essayParaDetails = await communityDao.getEssayParaDetails(data.userId, data.challengeId);
        const challengeUserDetails = await communityDao.getChallengeUserDetails(challengeDetails.rows[0].squirrel_id, challengeDetails.rows[0].racoon_id);

        const details = { challenge: challengeDetails.rows, essayPara: essayParaDetails.rows, challengeUser: challengeUserDetails.rows };
        res.status(200).json(details);
    } catch (err) {
        res.status(500).send(err.message);
    }
}