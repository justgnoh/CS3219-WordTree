import axios from "axios";

const WORD_SERVICE_HOST = "http://localhost:5007";
export const getWordsForSequenceInChallenge = async (
  challengeID,
  sequenceNum,
) => {
  if (isNaN(challengeID)) {
    return false;
  }
  const requestUrl = WORD_SERVICE_HOST + "/words/" + challengeID + "/" + sequenceNum;
  return await axios
    .get(requestUrl)
    .catch((err) => false);
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
  // return await axios
  //   
  //   .catch((err) => {
  //     console.log(err)
  //     return false});
};
