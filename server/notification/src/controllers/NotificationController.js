import * as notificationDao from "../database/NotificationDao.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const ERROR_NO_NOTIFICATION = "Bad Request. No notification found.";
const ERROR_NO_NOTIFICATION_ID = "Bad Request. No notification id found.";
const ERROR_NOT_AUTHENTICATED = "You are not authenticated, please log in and try again.";
const ERROR_NOT_AUTHORIZED = "You are not authorized to perform this action.";

export async function addNotification(req, res) {
    console.log("Notification Service: (POST) /addNotification");
    const data = req.body;
    let notificationLink = null;
    if (!data) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!data.userId) {
        return res.status(400).send(ERROR_NO_USER_ID);
    }
    if (!data.notification) {
        return res.status(400).send(ERROR_NO_NOTIFICATION);
    }
    if (data.notificationLink) {
        notificationLink = data.notificationLink;
    }

    await notificationDao.addNotification(data.userId, data.notification, notificationLink)
        .then(result => {
            try {
                const io = req.app.get("io");
                const uidToSocket = req.app.get("uidToSocket");
                const socketSet = uidToSocket.get(data.userId);
                if (socketSet) {
                    socketSet.forEach(socketId => {
                        console.log("Socket: send notification (" + socketId + ")");
                        io.to(socketId).emit("new_notification", result.rows[0])
                    });
                }
                res.status(200).send("OK");
            } catch (err) {
                res.status(500).send(err.message);
            }
        })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getNotification(req, res) {
    console.log("Notification Service: (GET) /getNotification");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.data.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    await notificationDao.getNotification(reqUserId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getAllNotification(req, res) {
    console.log("Notification Service: (GET) /getAllNotification");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.data.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    await notificationDao.getAllNotification(reqUserId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function viewedNotification(req, res) {
    console.log("Notification Service: (PUT) /viewedNotification");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.data.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    const body = req.body;
    if (!body) {
        return res.status(400).send(ERROR_NO_DATA);
    }
    if (!body.notificationId) {
        return res.status(400).send(ERROR_NO_NOTIFICATION_ID);
    }

    await notificationDao.viewedNotification(reqUserId, body.notificationId)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function viewedAllNotification(req, res) {
    console.log("Notification Service: (GET) /viewedAllNotification");

    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    try {
        const result = await axios.get('http://auth-service:8080/', { headers: { 'x-access-token': accessToken } });
        var reqUserId = result.data.uid;
    } catch (err) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }

    await notificationDao.viewedAllNotification(reqUserId)
        .then(result => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });
}
