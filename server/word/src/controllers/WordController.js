import worddao from '../database/WordDao.js';

class WordController {
   
    async getWordsForTurn(req, res) {
        const challengeid = req.params['challengeid'];
        const seqnum = req.params['seqnum'];
        try {
            const result = await worddao.getWordsForTurn(challengeid, seqnum);
            if (result.length == 0) {
                res.status(400).json();
            } else {
                res.json(result);
            } 
        } catch (err) {
            res.status(404).json();
        }
    }
}

export default new WordController();
