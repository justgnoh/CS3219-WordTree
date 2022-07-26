import * as userAccountDao from "../database/UserAccountDao.js";
import * as userProfileDao from "../database/UserProfileDao.js";
import * as userInterestDao from "../database/UserInterestDao.js";
import * as interestDao from "../database/InterestDao.js";
import { getAuthenticatedUserId } from "../communications/Authentication.js";
import { getUserNut } from "../communications/Nut.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const ERROR_NO_EMAIL = "Bad Request. No email found.";
const ERROR_NO_PASSWORD = "Bad Request. No password found.";
const ERROR_NO_NAME = "Bad Request. No name found.";
const ERROR_NO_INTEREST = "Bad Request. No interest found.";
const ERROR_NO_DATE_OF_BIRTH = "Bad Request. No date of birth found.";
const ERROR_NOT_AUTHENTICATED = "You are not authenticated, please log in and try again.";
const ERROR_NOT_AUTHORIZED = "You are not authorized to perform this action.";

export async function createUser(req, res) {
    console.log("User Service: (POST) /createUser");

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

    const body = req.body;
    if (!body) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (body.userId != reqUserId) {
        return res.status(403).send(ERROR_NOT_AUTHORIZED);
    }
    if (!body.email) {
        return res.status(400).send(ERROR_NO_EMAIL);
    }
    if (!body.name) {
        return res.status(400).send(ERROR_NO_NAME);
    }
    if (!body.dateOfBirth) {
        return res.status(400).send(ERROR_NO_DATE_OF_BIRTH);
    }

    try {
        await userAccountDao.createUserAccount(body.userId, body.email);
        await userProfileDao.createUserProfile(body.userId, body.name, body.dateOfBirth);
        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUserProfile(req, res) {
    console.log("User Service: (GET) /getUserProfile");

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

    try {
        const profileDetails = await userProfileDao.getUserProfile(reqUserId);
        const interestDetails = await userInterestDao.getUserInterest(reqUserId);
        const nutDetails = await getUserNut(reqUserId);

        const details = { profile: profileDetails.rows[0], interest: interestDetails.rows, nut: nutDetails.data };
        res.status(200).json(details);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateUserProfile(req, res) {
    console.log("User Service: (PUT) /updateUserProfile");

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

    const body = req.body;
    if (!body) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.name) {
        return res.status(400).send(ERROR_NO_NAME);
    }
    if (!body.dateOfBirth) {
        return res.status(400).send(ERROR_NO_DATE_OF_BIRTH);
    }

    try {
        await userProfileDao.updateUserName(reqUserId, body.name, body.dateOfBirth);
        if (body.interest) {
            await userInterestDao.clearUserInterest(reqUserId);
            await userInterestDao.addUserInterest(reqUserId, body.interest);
        }
        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getInterest(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    console.log("User Service: (GET) /getInterest");

    await interestDao.getInterest()
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getUserInterest(req, res) {
    console.log("User Service: (GET) /getUserInterest");

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

    await userInterestDao.getUserInterest(reqUserId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function updateUserInterest(req, res) {
    console.log("User Service: (PUT) /updateUserInterest");

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

    const body = req.body;
    if (!body) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.interest) {
        return res.status(400).send(ERROR_NO_INTEREST);
    }

    try {
        await userInterestDao.clearUserInterest(reqUserId);
        await userInterestDao.addUserInterest(reqUserId, body.interest);
        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
}