import * as essaydao from '../database/EssayDao.js';

export async function postNewPara(req, res) {
    const challengeid = req.params['challengeid'];
    const authorid = req.body['authorid'];
    const seqnum = req.body['seqnum'];
    const essaypara = req.body['essaypara'];

    const wordsused = getWordsUsed(challengeid, seqnum, essaypara);

    try {
        await essaydao.insertNewEssayPara(challengeid, seqnum, authorid, essaypara, wordsused);

        //TODO: send to nut service the points
        //SEND.NURSERVICES


        res.status(200).json();
    } catch (err) {
        res.status(400).json();
    }
}

export function getWordsUsed(challengeid, seqnum, essaypara) {
    try {
    //TODO: link to word service endpoint to get the 3 words
        const wordarr = [];
        let words_used = [];
        for (let i = 0; i < wordarr.length; i++) {
            if (essaypara.includes(wordarr[i])) {
                words_used.push(wordarr[i]);
            }
        }
        return words_used;
    } catch (err) {
        res.status(400).json();
    }
}

export async function getAllEssayPara(req, res) {
    const challengeid = req.params['challengeid'];
    try {
        const result = await essaydao.getAllEssayPara(challengeid);
        res.json(result);
    } catch (err) {
        res.status(400).json();
    }
}
