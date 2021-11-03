import axios from "axios";

const ESSAY_SERVICE_HOST = "http://localhost:5006";
export const addEssayParaToEssayService = async (
  authorID,
  seq_num,
  essaypara,
  challengeID
) => {
  console.log(authorID, seq_num, essaypara, challengeID);
  if (isNaN(challengeID)) {
    return false;
  }
  const requestUrl = ESSAY_SERVICE_HOST + "/newEssayPara/" + challengeID;
  return await axios
    .post(requestUrl, {
      author_id: authorID,
      seq_num: seq_num,
      essaypara: essaypara,
    })
    .then((res) => true)
    .catch((err) => false);
};

export const getEssayParaFromEssayService = async (challengeID) => {
  if (isNaN(challengeID)) {
    return false;
  }
  const requestUrl = ESSAY_SERVICE_HOST + "/allEssayPara/" + challengeID;
  return await axios
    .get(requestUrl)
    .then((res) => res.data)
    .catch((err) => false);
};
