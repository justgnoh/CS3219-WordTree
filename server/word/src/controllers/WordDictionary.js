import axios from 'axios';

//WordDictionary interacts with MERRIAM-WEBSTER's Thesaurus API
export async function getSetOfSynonyms(word) {
    const key = "ca8c9841-6fe0-4177-bc4f-7ba145071158";
    try {
        var setOfSynonyms = new Set();
        const response = await axios.get('https://dictionaryapi.com/api/v3/references/thesaurus/json/' + word + "?key=" + key);
        const synonyms = response.data[0].meta.syns; //array of array

        for (let i = 0; i < synonyms.length; i++) {
            const arr = synonyms[i];
            for (let j = 0; j < arr.length; j++) {
                setOfSynonyms.add(arr[j]);
            }
        }
        return setOfSynonyms;

    } catch (err) {
        console.log(err);
    }
}
