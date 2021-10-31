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

export async function createUser(req, res) {
    console.log("createUser: ", req.body);
    const profile = req.body;
    if (profile == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!profile.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!profile.email) {
        return res.status(400).send(ERROR_NO_EMAIL);
    }
    if (!profile.password) {
        return res.status(400).send(ERROR_NO_PASSWORD);
    }
    if (!profile.name) {
        return res.status(400).send(ERROR_NO_NAME);
    }
    if (!profile.dateOfBirth) {
        return res.status(400).send(ERROR_NO_DATE_OF_BIRTH);
    }

    try {
        await userAccountDao.createUserAccount(profile.userId, profile.email, profile.password);
        await userProfileDao.createUserProfile(profile.userId, profile.name, profile.dateOfBirth);
        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUserProfile(req, res) {
    console.log("getUserProfile: ", req.params);
    const userId = req.params.userId;

    try {
        const profileDetails = await userProfileDao.getUserProfile(userId);
        const interestDetails = await userInterestDao.getUserInterest(userId);

        const details = { profile: profileDetails.rows[0], interest: interestDetails.rows };
        res.status(200).json(details);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateUserPassword(req, res) {
    console.log("updateUserPassword: ", req.body);
    const body = req.body;
    if (body == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!body.password) {
        return res.status(400).send(ERROR_NO_PASSWORD);
    }

    await userAccountDao.updateUserPassword(body.userId, body.password)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function updateUserProfile(req, res) {
    console.log("updateUserName: ", req.body);
    const body = req.body;
    if (body == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!body.name) {
        return res.status(400).send(ERROR_NO_NAME);
    }
    if (!body.dateOfBirth) {
        return res.status(400).send(ERROR_NO_DATE_OF_BIRTH);
    }

    await userProfileDao.updateUserName(body.userId, body.name, body.dateOfBirth)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function updateUserTotalNut(req, res) {
    console.log("updateUserTotalNut: ", req.body);
    const body = req.body;
    if (body == undefined) {
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
    console.log("addInterest: ", req.body);
    const body = req.body;
    if (body == undefined) {
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
    console.log("deleteUserInterest: ", req.body);
    const body = req.body;
    if (body == undefined) {
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
    console.log("getInterest: ");

    await interestDao.getInterest()
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function addUserInterest(req, res) {
    console.log("addUserInterest: ", req.body);
    const body = req.body;
    if (body == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!body.interest) {
        return res.status(400).send(ERROR_NO_INTEREST);
    }

    try {
        var interestArr = JSON.parse(body.interest);
    } catch (err) {
        var interestArr = [body.interest];
    }

    await userInterestDao.addUserInterest(body.userId, interestArr)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteUserInterest(req, res) {
    console.log("deleteUserInterest: ", req.body);
    const body = req.body;
    if (body == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!body.interest) {
        return res.status(400).send(ERROR_NO_INTEREST);
    }

    try {
        var interestArr = JSON.parse(body.interest);
    } catch (err) {
        var interestArr = [body.interest];
    }

    await userInterestDao.deleteUserInterest(body.userId, interestArr)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getUserInterest(req, res) {
    console.log("getUserInterest: ", req.params);
    const userId = req.params.userId;

    await userInterestDao.getUserInterest(userId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function clearUserInterest(req, res) {
    console.log("clearUserInterest: ", req.params);
    const userId = req.params.userId;

    await userInterestDao.clearUserInterest(userId)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}