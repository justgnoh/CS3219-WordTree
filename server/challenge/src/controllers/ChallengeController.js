import express from "express";
import { error_messages, OK_MESSAGE } from "../config/index.js";
import {
  getPlayersInChallenge,
  addChallenge,
  getNumOfCompletedTurnsForChallenge,
  updateTurnDetails,
  getChallengeByUserIdFromDB,
  getChallengeByChallengeIdFromDB,
  insertNewTurnDetails,
  getLastModifiedTimeForChallenge,
} from "../database/ChallengesDao.js";
import {
  getEssayParaFromEssayService,
  addEssayParaToEssayService,
} from "../communications/essayInformation.js";
import {
  initWordsForChallenge,
  getWordsForSequenceInChallenge,
} from "../communications/wordInformation.js";

export const getAllChallengeByUserId = async (req, res) => {
  const userID = req.query.userid;
  if (req.query.userid === undefined) {
    return res.status(400).send(error_messages.MISSING_FIELDS);
  }
  const challenges = await getChallengeByUserIdFromDB(userID);
  return res.status(200).json(challenges);
};

export const createNewChallenge = async (req, res) => {
  const userID = req.headers["x-access-token"];
  const data = req.body;
  if (
    data === undefined ||
    userID === undefined ||
    !data.num_of_total_turns ||
    !data.word_limit_per_turn ||
    !data.interest
  )
    return res.status(400).send(error_messages.MISSING_FIELDS);
  if (data.num_of_total_turns !== 4 && data.num_of_total_turns !== 6)
    return res.status(400).send(error_messages.INVALID_FIELDS);
  if (data.word_limit_per_turn !== 300 && data.word_limit_per_turn !== 500)
    return res.status(400).send(error_messages.INVALID_FIELDS);

  const challenge = await addChallenge(
    userID,
    data.num_of_total_turns,
    data.word_limit_per_turn,
    data.interest
  ).catch((err) => {
    if (err.constraint !== undefined) {
      if (err.constraint.includes("fkey") > 0) {
        return res.status(400).send(error_messages.INVALID_FIELDS);
      }
    }
    return res.status(500).send(err.message);
  });

  if (challenge && challenge.length > 0 && challenge[0].challenge_id) {
    const challengeID = challenge[0].challenge_id;
    const wordsToUse = await initWordsForChallenge(
      challengeID,
      data.interest,
      data.num_of_total_turns
    );
    const resBody = {
      challenge_id: challengeID,
      words: wordsToUse,
    };
    await insertNewTurnDetails(challengeID)
      .then(() => res.status(200).json(resBody))
      .catch((err) => {

        return res.status(500).send(error_messages.INTERNAL_ERROR);
      });
  }
};

export const addEssayPara = async (req, res) => {
  let userID = req.headers["x-access-token"];
  const { id: challengeID } = req.params;
  const data = req.body;

  if (!userID || !data.essay_para)
    return res.status(400).send(error_messages.MISSING_FIELDS);
  if (isNaN(challengeID))
    return res.status(400).send(error_messages.INVALID_FIELDS);

  userID = parseInt(userID);

  const allPlayerIDs = await getPlayersInChallenge(challengeID).catch((err) =>
    res.status(500).send(err.message)
  );

  const challenge = await getChallengeByChallengeIdFromDB(challengeID);

  if (allPlayerIDs === undefined || allPlayerIDs.length === 0) {
    return res.status(404).send(error_messages.NO_SUCH_CHALLENGE_FOUND);
  }

  const sequenceNum = await getNumOfCompletedTurnsForChallenge(challengeID)
    .then((numOfCompletedTurnsRes) => {

      if (numOfCompletedTurnsRes.length > 0) {
        // Extracting Results
        let sequenceNum = numOfCompletedTurnsRes[0].num_of_sequences_completed;
        if (sequenceNum !== undefined) {
          return sequenceNum;
        }
      }
      return -1;
    })
    .catch((err) => -1);

  if (sequenceNum < 0 || sequenceNum >= challenge["num_of_total_turns"]) {
    return res.status(403).send(error_messages.WRONG_TURN);;
  }
  const isCorrectPlayerTurn =
    sequenceNum % 2 === 0
      ? allPlayerIDs.indexOf(userID) === 0 // squirrel turn
      : allPlayerIDs.indexOf(userID) === 1; // racoon turn

  if (isCorrectPlayerTurn) {
    const result = await addEssayParaToEssayService(
      userID,
      sequenceNum + 1,
      data.essay_para,
      challengeID
    );
    if (!result) res.status(500).send(error_messages.INTERNAL_ERROR);
    await updateTurnDetails(challengeID).catch((err) => {
      return res.status(500).send(err.message);
    });
    return res.status(200).send(OK_MESSAGE);
  } else {
    return res.status(403).send(error_messages.WRONG_TURN);
  }
};

export const getChallengeByChallengeId = async (req, res) => {
  const userID = req.headers["x-access-token"];
  if (!userID) {
    return res.status(400).send(error_messages.MISSING_FIELDS);
  }
  const params = req.params;

  if (!params) {
    return res.status(400).send(error_messages.MISSING_FIELDS);
  }

  const challengeID = params["id"];
  const challenges = await getChallengeByChallengeIdFromDB(challengeID);

  if (challenges.length > 1) {
    console.log("Duplicate Challenge ID found");
    return res.status(500).send(error_messages.INTERNAL_ERROR);
  }
  const challenge = challenges[0]
  if (challenge["status_of_challenge"] != "COMPLETED") {
    if (
      userID != challenge["squirrel_id"] &&
      userID != challenge["racoon_id"]
    ) {
      return res.status(401).send(error_messages.NOT_IN_THIS_CHALLENGE);
    }
  }


  if (challenge["status_of_challenge"] != "COMPLETED") {
    const sequenceNum = await getNumOfCompletedTurnsForChallenge(challengeID)
    .then((numOfCompletedTurnsRes) => {

      if (numOfCompletedTurnsRes.length > 0) {
        // Extracting Results
        let sequenceNum = numOfCompletedTurnsRes[0].num_of_sequences_completed;
        if (sequenceNum !== undefined) {
          return sequenceNum;
        }
      }
      return -1;
    })
    .catch((err) => -1);

    if (sequenceNum < 0 ) {
      return res.status(500).send(error_messages.INTERNAL_ERROR);;
    }
    if (sequenceNum < challenge['num_of_total_turns']) {
      const nextWords = await getWordsForSequenceInChallenge(challengeID, sequenceNum + 1)
      console.log(nextWords)
      if (nextWords) challenge['words'] = nextWords;
      else res.status(500).send(error_messages.INTERNAL_ERROR);
    }
  }
  const allEssayPara = await getEssayParaFromEssayService(challengeID);
  if (allEssayPara) challenge["essay_paras"] = allEssayPara;
  else res.status(500).send(error_messages.INTERNAL_ERROR);

  const lastModifiedTimeRes = await getLastModifiedTimeForChallenge(challengeID)
  if (lastModifiedTimeRes.length < 0) return res.status(500).send(error_messages.INTERNAL_ERROR)
  const lastModifiedTime = lastModifiedTimeRes[0]['time_of_last_completed_sequence']

  challenge['last_modified_time'] = lastModifiedTime;
  
  return res.status(200).json(challenge);
};
