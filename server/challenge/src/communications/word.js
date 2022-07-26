import axios from "axios";

const WORD_SERVICE_HOST = "http://word-service:8080";
export const getWordsForSequenceInChallenge = async (
  challengeID,
  sequenceNum,
) => {
  if (isNaN(challengeID)|| isNaN(sequenceNum)) {
    return false;
  }
  const requestUrl = WORD_SERVICE_HOST + "/words/" + challengeID + "/" + sequenceNum;
  return await axios
    .get(requestUrl)
    .then(res => res.data)
    .catch(e => false);
};

export const initWordsForChallenge = async (
  challengeID,
  interest,
  totalTurns
) => {
  if (isNaN(challengeID)) {
    return false;
  }

  const requestUrl = WORD_SERVICE_HOST + "/wordlist";
  return  axios.post(requestUrl, {
        "challenge_id": challengeID,
        "interest": interest,
        "num_of_total_turns": totalTurns,
      }).then(res => res.data).catch(err => console.log(err))
};
