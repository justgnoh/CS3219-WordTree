import axios from "axios";

const ESSAY_SERVICE_HOST = "http://localhost:5007";
export const getWordsForSequenceInChallenge = (
  challengeID,
  sequenceNum,
) => {
  if (isNaN(challengeID)) {
    return false;
  }
  const requestUrl = ESSAY_SERVICE_HOST + "/words/" + challengeID + "/" + sequenceNum;
  return await axios
    .get(requestUrl)
    .catch((err) => false);
};

export const initWordsForChallenge = (
  challengeID,
  interest,
  totalTurns
) => {
  if (isNaN(challengeID)) {
    return false;
  }
  const requestUrl = ESSAY_SERVICE_HOST + "/wordlist/" + challengeID;
  return await axios
    .post(requestUrl, {
      "challenge_id": challengeID,
      "interest": interest,
      "num_of_total_turns": totalTurns,
    })
    .catch((err) => false);
};
