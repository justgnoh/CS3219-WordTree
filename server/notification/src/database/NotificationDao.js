import pool from '../database/db.js';

const notificationDb = "Notification";
const notificationIdCol = "notification_id";
const userIdCol = "user_id";
const creationDateTimeCol = "creation_date_time";
const notificationCol = "notification";
const isViewedCol = "is_viewed";
const viewedDateTimeCol = "viewed_date_time";
const notificationLinkCol = "notification_link";

export async function addNotification(userId, notification, notificationLink) {
    try {
        const result = await pool.query("INSERT INTO " + notificationDb + "(" + userIdCol + ", " + notificationCol +
                ", " + notificationLinkCol + ") VALUES ($1, $2, $3);", [userId, notification, notificationLink]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getNotification(userId) {
    try {
        const result = await pool.query("SELECT * FROM " + notificationDb +
                " WHERE " + userIdCol + " = $1 ORDER BY " + creationDateTimeCol + " DESC LIMIT 10;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getAllNotification(userId) {
    try {
        const result = await pool.query("SELECT * FROM " + notificationDb +
                " WHERE " + userIdCol + " = $1 ORDER BY " + creationDateTimeCol + " DESC;", [userId]);
        return result;
    } catch (err) {
        throw err;
    }
}