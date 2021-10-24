import * as worddao from '../database/WordDao.js';
import * as worddict from './WordDictionary.js'

const MISSING_FIELDS = "Bad Request. Missing fields.";

export async function test(req,res) {
    res.json("TESTING POST SUCCESS!");
}

export async function testroute(req,res) {
    res.json("TESTING ROUTE SUCCESS!");
}

export async function createNewWordList(req, res) {
    const challengeid = req.body['challenge_id'];
    const interest = req.body['interest'];
    const numturns = req.body['num_of_total_turns'];

    if (!challengeid || !interest || !numturns) {
        return res.status(400).send(MISSING_FIELDS);
    }
    try {
        let wordlist = await generateWords(interest, numturns);

        for (let i = 1; i <= numturns; i++) {
            await worddao.insertWordList(challengeid, i, wordlist[i - 1]);
        }

        let firstWordArr = await worddao.getWordsForTurn(challengeid, 1);
        return res.status(200).json(firstWordArr);
    } catch (err) {
        console.log(err);
        return res.status(400).json();
    }
}

//generates the 2D array of wordlist
export async function generateWords(interest, numturns) {
    try {
        let setOfSynonyms = await worddict.getSetOfSynonyms(interest)
        let shuffleArr = Array.from(setOfSynonyms);
        fisherYates(shuffleArr); //shuffles array
        return await convertToWordList(shuffleArr, numturns)
    } catch (err) {
        throw err;
    }
}

// Code from: http://sedition.com/perl/javascript-fy.html
// Knuth Shuffle - used to shuffle the word array 
export function fisherYates(myArray) {
    var i = myArray.length;
    if (i == 0) return false;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
}

//converts the shuffled 1D array to 2D array
export async function convertToWordList(array, numturns) {
    if (!array || !array.length) {
        throw 'No words generated in word list!';
    }

    if (array.length < numturns * 3) { //if not enough words, just repeat
        for (let i = 0; i < numturns * 3 - array.length + 1; i++) {
            array.push(array[i]);
        }
    }
    let wordlist = [];
    let index = 0;
    for (let i = 0; i < numturns; i++) {
        let currturn = [];
        for (let j = 0; j < 3; j++) {
            currturn.push(array[index]);
            index++;
        }
        wordlist.push(currturn);
    }
    return wordlist;
}

export async function getWordsForTurn(req, res) {
    const challengeid = req.params['challengeid'];
    const seqnum = req.params['seqnum'];
 
    try {
        const result = await worddao.getWordsForTurn(challengeid, seqnum);
        res.json(result);
    } catch (err) {
        res.status(400).json();
    }
}
