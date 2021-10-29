import axios from 'axios';
import * as essaydao from '../database/EssayDao.js';

const MISSING_INFO = "Bad Request. Missing fields or parameters.";

export async function test(req, res) {
    const testing = req.params['test'];
    const response = await axios.get('http://word-service:8080/testing')
    res.json("test cross communication success" + response.data);
}

export async function test2(req, res) {
    const t = req.body['t'];
    res.json(t);
}

export async function postNewPara(req, res) {
    const challengeid = req.params['challengeid'];
    const authorid = req.body['author_id'];
    const seqnum = req.body['seq_num'];
    const essaypara = req.body['essaypara'];

    if (!authorid || !seqnum || !essaypara) {
        return res.status(400).send(MISSING_INFO);
    }

    try {
        const wordsused = await getWordsUsed(challengeid, seqnum, essaypara);
        await essaydao.insertNewEssayPara(challengeid, seqnum, authorid, essaypara, wordsused);

        //Send points to nuts service
        if (wordsused.length > 0) {
            await axios.post('localhost:5011/newEssayNut', {
                ChallengeId: challengeid,
                SeqNum: seqnum,
                NumberOfNuts: wordsused.length,
                UserId: authorid
            }
            );
        }

        return res.status(200).json();
    } catch (err) {
        console.log(err);
        return res.status(400).json();
    }
}

export async function getWordsUsed(challengeid, seqnum, essaypara) {
    try {
        let wordarr = await axios.get('http://127.0.0.1:5007/words/' + challengeid + '/' + seqnum);

        if (!wordarr.data) {
            throw "Words for this challenge id and sequence number does not exist!"
        }

        wordarr = wordarr.data;
        let words_used = [];
        for (let i = 0; i < wordarr.length; i++) {
            if (essaypara.includes(wordarr[i])) {
                words_used.push(wordarr[i]);
            }
        }
        return words_used;
    } catch (err) {
        throw err;
    }
}

export async function getAllEssayPara(req, res) {
    const challengeid = req.params['challengeid'];

    if (!challengeid) {
        return res.status(400).send(MISSING_INFO);
    }

    await essaydao.getAllEssayPara(challengeid)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json();
        });
}
