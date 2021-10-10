import axios from 'axios';

//WordDictionary interacts with MERRIAM-WEBSTER's Thesaurus API

const key = "ca8c9841-6fe0-4177-bc4f-7ba145071158";

export async function getSetOfSynonyms(word) {
    var setOfSynonyms = new Set();

    const response = await axios.get('https://dictionaryapi.com/api/v3/references/thesaurus/json/' + word + "?key=" + key)
        .catch(err => {
            throw err;
        });

    if (!response || !response.data[0] || !response.data[0].meta || !response.data[0].meta.syns) { //means no synonyms for this word
        throw 'No synonyms found for this word.'
    }

    const synonyms = response.data[0].meta.syns; //array of array

    for (let i = 0; i < synonyms.length; i++) {
        const arr = synonyms[i];
        for (let j = 0; j < arr.length; j++) {
            setOfSynonyms.add(arr[j]);
        }
    }
    return setOfSynonyms;
}
