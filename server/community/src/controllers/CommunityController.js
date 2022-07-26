import * as communityDao from "../database/CommunityDao.js";
import { getAuthenticatedUserId } from "../communications/Authentication.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_CHALLENGE_ID = "Bad Request. No challenge id found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const ERROR_NOT_EXIST_OR_COMPLETED = "Not Found. Challenge does not exist or is not completed.";
const ERROR_NOT_AUTHENTICATED = "You are not authenticated, please log in and try again.";
const ERROR_NOT_AUTHORIZED = "You are not authorized to perform this action.";
const DEFAULT_LIMIT = 50;
const DEFAULT_OFFSET = 0;

export async function listChallenges(req, res) {
    console.log("Community Service: (POST) /listChallenges");

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

    const data = req.params;
    let offset = DEFAULT_OFFSET;
    let limit = DEFAULT_LIMIT;
    if (data) {
        if (data.limit) {
            limit = data.limit;
        }
        if (data.offset) {
            offset = data.offset;
        }
    }

    await communityDao.listChallenges(reqUserId, limit, offset)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getChallenge(req, res) {
    console.log("Community Service: (POST) /getChallenge");

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

    const challengeId = req.params.challengeId;

    try {
        const result = await communityDao.checkChallenge(challengeId);
        // check if challenge does not exist or is not completed
        if (result.rows[0].count == 0) {
            res.status(404).send(ERROR_NOT_EXIST_OR_COMPLETED);
        } else {
            const challengeDetails = await communityDao.getChallengeDetails(reqUserId, challengeId);
            const essayParaDetails = await communityDao.getEssayParaDetails(reqUserId, challengeId);
            const challengeUserDetails = await communityDao.getChallengeUserDetails(challengeDetails.rows[0].squirrel_id, challengeDetails.rows[0].racoon_id);

            const details = { challenge: challengeDetails.rows[0], essayPara: essayParaDetails.rows, challengeUser: challengeUserDetails.rows };
            res.status(200).json(details);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}