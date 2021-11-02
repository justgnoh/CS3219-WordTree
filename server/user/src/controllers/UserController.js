import axios from 'axios';
import * as userAccountDao from "../database/UserAccountDao.js";
import * as userProfileDao from "../database/UserProfileDao.js";
import * as userInterestDao from "../database/UserInterestDao.js";
import * as interestDao from "../database/InterestDao.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const ERROR_NO_EMAIL = "Bad Request. No email found.";
const ERROR_NO_PASSWORD = "Bad Request. No password found.";
const ERROR_NO_NAME = "Bad Request. No name found.";
const ERROR_NO_INTEREST = "Bad Request. No interest found.";
const ERROR_NO_TOTAL_NUT = "Bad Request. No total nut found.";
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
        const result = await axios.get('http://auth-service:80/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
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
        const result = await axios.get('http://auth-service:80/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const profileDetails = await userProfileDao.getUserProfile(reqUserId);
        const interestDetails = await userInterestDao.getUserInterest(reqUserId);

        const details = { profile: profileDetails.rows[0], interest: interestDetails.rows };
        res.status(200).json(details);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateUserPassword(req, res) {
    console.log("User Service: (PUT) /updateUserPassword");

    /* To be removed in future once password implementation is done */
    return res.status(403).send(ERROR_NOT_AUTHORIZED);

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:80/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    const body = req.body;
    if (!body) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.password) {
        return res.status(400).send(ERROR_NO_PASSWORD);
    }

    await userAccountDao.updateUserPassword(reqUserId, body.password)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function updateUserProfile(req, res) {
    console.log("User Service: (PUT) /updateUserProfile");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:80/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
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
    if (!body.interest) {
        var interestArr;
    } else {
        try {
            var interestArr = JSON.parse(body.interest);
        } catch (err) {
            var interestArr = [body.interest];
        }
    }

    try {
        await userProfileDao.updateUserName(reqUserId, body.name, body.dateOfBirth);
        await userInterestDao.clearUserInterest(reqUserId);
        if (interestArr) {
            await userInterestDao.addUserInterest(reqUserId, interestArr);
        }
        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateUserTotalNut(req, res) {
    console.log("User Service: (PUT) /updateUserTotalNut");
    const body = req.body;
    if (!body) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!body.totalNut) {
        if (body.totalNut != 0) {
            return res.status(400).send(ERROR_NO_TOTAL_NUT);
        }
    }

    await userProfileDao.updateUserTotalNut(body.userId, body.totalNut)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function addInterest(req, res) {
    console.log("User Service: (POST) /addInterest");

    /* To be removed in future once admin implementation is done */
    return res.status(403).send(ERROR_NOT_AUTHORIZED);

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:80/admin', { headers: { 'x-access-token': accessToken } });
        var isAdmin = result.rows.isAdmin;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    if (!isAdmin) {
        res.status(403).send(ERROR_NOT_AUTHORIZED);
    }

    const body = req.body;
    if (!body) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.interest) {
        return res.status(400).send(ERROR_NO_INTEREST);
    }

    await interestDao.addInterest(body.interest)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteInterest(req, res) {
    console.log("User Service: (DELETE) /deleteInterest");

    /* To be removed in future once admin implementation is done */
    return res.status(403).send(ERROR_NOT_AUTHORIZED);

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:80/admin', { headers: { 'x-access-token': accessToken } });
        var isAdmin = result.rows.isAdmin;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    if (!isAdmin) {
        res.status(403).send(ERROR_NOT_AUTHORIZED);
    }

    const body = req.body;
    if (!body) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.interest) {
        return res.status(400).send(ERROR_NO_INTEREST);
    }

    await interestDao.deleteInterest(body.interest)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getInterest(req, res) {
    console.log("User Service: (GET) /getInterest");

    await interestDao.getInterest()
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function addUserInterest(req, res) {
    console.log("User Service: (POST) /addUserInterest");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:80/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
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
        var interestArr = JSON.parse(body.interest);
    } catch (err) {
        var interestArr = [body.interest];
    }

    await userInterestDao.addUserInterest(reqUserId, interestArr)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteUserInterest(req, res) {
    console.log("User Service: (DELETE) /deleteUserInterest");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:80/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
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
        var interestArr = JSON.parse(body.interest);
    } catch (err) {
        var interestArr = [body.interest];
    }

    await userInterestDao.deleteUserInterest(reqUserId, interestArr)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getUserInterest(req, res) {
    console.log("User Service: (GET) /getUserInterest");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:80/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    await userInterestDao.getUserInterest(reqUserId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function clearUserInterest(req, res) {
    console.log("User Service: (DELETE) /clearUserInterest");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:80/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    await userInterestDao.clearUserInterest(reqUserId)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function updateUserInterest(req, res) {
    console.log("User Service: (PUT) /updateUserInterest");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:80/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.rows.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        var interestArr = JSON.parse(body.interest);
    } catch (err) {
        var interestArr = [body.interest];
    }

    try {
        await userInterestDao.clearUserInterest(reqUserId);
        await userInterestDao.addUserInterest(reqUserId, interestArr);
        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
}