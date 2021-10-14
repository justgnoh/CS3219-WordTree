import * as userDao from "../database/UserProfileDao.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const ERROR_NO_NAME = "Bad Request. No name found.";
const ERROR_NO_INTEREST = "Bad Request. No interest found.";

export async function createUserProfile(req, res) {
    console.log("createUserProfile: ", req.body);
    const profile = req.body;
    if (profile == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!profile.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!profile.name) {
        return res.status(400).send(ERROR_NO_NAME);
    }

    await userDao.createUserProfile(profile.userId, profile.name)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getUserProfile(req, res) {
    console.log("getUserProfile: ", req.params);
    const userId = req.params.userId;

    await userDao.getUserProfile(userId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getUserInterest(req, res) {
    console.log("getUserInterest: ", req.params);
    const userId = req.params.userId;

    await userDao.getUserInterest(userId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteUserInterest(req, res) {
    console.log("deleteUserInterest: ", req.body);
    const profile = req.body;
    if (profile == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!profile.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!profile.interest) {
        return res.status(400).send(ERROR_NO_INTEREST);
    }

    await userDao.deleteUserInterest(profile.userId, profile.interest)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function addUserInterest(req, res) {
    console.log("addUserInterest: ", req.body);
    const profile = req.body;
    if (profile == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!profile.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!profile.interest) {
        return res.status(400).send(ERROR_NO_INTEREST);
    }

    await userDao.addUserInterest(profile.userId, profile.interest)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}