import * as notificationDao from "../database/NotificationDao.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const ERROR_NO_NOTIFICATION = "Bad Request. No notification found.";

export async function addNotification(req, res) {
    console.log("addNotification: ", req.body);
    const data = req.body;
    let notificationLink = null;
    if (data == undefined) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!data.notification) {
        return res.status(400).send(ERROR_NO_NOTIFICATION);
    }
    if (data.notificationLink != undefined) {
        notificationLink = data.notificationLink;
    }

    await notificationDao.addNotification(data.userId, data.notification, notificationLink)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getNotification(req, res) {
    console.log("getNotification: ", req.params);
    const userId = req.params.userId;

    await notificationDao.getNotification(userId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getAllNotification(req, res) {
    console.log("getAllNotification: ", req.params);
    const userId = req.params.userId;

    await notificationDao.getAllNotification(userId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}