import * as worddao from '../database/WordDao.js';
import * as worddict from './WordDictionary.js'

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

//generates the 2D array of wordlist
export async function generateWords(categories, numturns) {
    let wordSet = new Set();
    try {
        for (var i = 0; i < categories.length; i++) {
            let catWordSet = Array.from(await worddict.getSetOfSynonyms(categories[i]));
            for (let key of catWordSet) {
                wordSet.add(key);
            }
        }
        let shuffleArr = Array.from(wordSet);
        fisherYates(shuffleArr); //shuffles array
        return await convertToWordList(shuffleArr, numturns);
    } catch (err) {
        console.log(err);
    }
}

export async function createNewWordList(req, res) {
    const challengeid = req.body['challengeid'];
    const categories = req.body['categories'];
    const numturns = req.body['numturns'];

    try {
        let wordlist = await generateWords(categories, numturns);
        for (let i = 1; i <= numturns; i++) {
            await worddao.insertWordList(challengeid, i, wordlist[i - 1]);
        }
        res.status(200).json();
    } catch (err) {
        console.log(err);
        res.status(400).json();
    }
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
