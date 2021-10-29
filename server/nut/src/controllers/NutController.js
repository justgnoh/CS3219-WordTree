import * as nutDao from "../database/NutDao.js";

const ERROR_NO_DATA = "Bad Request. No data found.";
const ERROR_NO_USER_ID = "Bad Request. No user id found.";
const ERROR_NO_NUT = "Bad Request. No nut found.";
const ERROR_NO_CHALLENGE_ID = "Bad Request. No challenge id found.";
const ERROR_NO_SEQ_NUM = "Bad Request. No sequence number found.";

export async function newEssayNut(req, res) {
    console.log("addNut: ", req.body);
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

    await nutDao.newEssayNut(data.userId, data.nut, data.challengeId, data.seqNum)
        .then(result1 => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });

//    await nutDao.addNut(data.userId, data.nut, data.challengeId, data.seqNum)
//        .then(result1 => {
//            await nutDao.getTotalNut(data.userId)
//                .then(result2 => {
//                    console.log("totalNut: ", result2);
//                    /* To be done: call user service to update total nut in user profile
//                    updateProfileTotalNut(data.userId); */
//                    res.status(200).send("OK");
//                })
//                .catch(err => { res.status(500).send(err.message); });
//        })
//        .catch(err => { res.status(500).send(err.message); });
}

export async function deleteEssayNut(req, res) {
    console.log("deleteNut: ", req.body);
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
        .then(result1 => { res.status(200).send("OK"); })
        .catch(err => { res.status(500).send(err.message); });

//    await nutDao.addNut(data.userId, data.challengeId, data.seqNum)
//        .then(result1 => {
//            await nutDao.getTotalNut(data.userId)
//                .then(result2 => {
//                    console.log("totalNut: ", result2);
//                    /* To be done: call user service to update total nut in user profile
//                    updateProfileTotalNut(data.userId); */
//                    res.status(200).send("OK");
//                })
//                .catch(err => { res.status(500).send(err.message); });
//        })
//        .catch(err => { res.status(500).send(err.message); });
}

export async function viewUserNut(req, res) {
    console.log("viewUserNut: ", req.params);
    const userId = req.params.userId;
    
    await nutDao.viewUserNut(userId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

export async function getTotalNut(req, res) {
    console.log("getTotalNut: ", req.params);
    const userId = req.params.userId;

    await nutDao.getTotalNut(userId)
        .then(result => { res.status(200).json(result.rows); })
        .catch(err => { res.status(500).send(err.message); });
}

/* To be done: call user service to update total nut in user profile
export async function updateProfileTotalNut(userId) {

} */