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
  updateRacoonIDForChallengeAcceptance,
  updateStatusOfChallenge,
  getAllChallengesWaitingMatchFromDB,
  updateTitleOfChallenge
} from "../database/ChallengesDao.js";
import {
  getEssayParaFromEssayService,
  addEssayParaToEssayService,
} from "../communications/essay.js";
import {
  initWordsForChallenge,
  getWordsForSequenceInChallenge,
} from "../communications/word.js";
import {
  addNotificationChallengeAccepted,
  addNotificationForOtherUserOnTurnEnd
} from "../communications/notifications.js"
import { getAuthenticatedUserIDFromAuthService } from "../communications/auth.js";


export const getAllChallengeByUserId = async (req, res) => {
  const userID = await getAuthenticatedUserID(req.headers["x-access-token"]);
  if (!userID) {
    return res.status(401).send(error_messages.INVALID_ACCESS_TOKEN);
  }
  const challenges = await getChallengeByUserIdFromDB(userID);
  for (let i = 0; i < challenges.length; i++) {
    let sqnum = challenges[i].num_of_sequences_completed;
    let squirrel_id = challenges[i].squirrel_id;
    let racoon_id = challenges[i].racoon_id;
    let awaitingID = sqnum % 2 == 0 ? squirrel_id : racoon_id;
    challenges[i]['awaiting_turn_uid'] = awaitingID;
  }
  return res.status(200).json(challenges); 
};

export const acceptChallenge = async (req, res) => {

  const userID = await getAuthenticatedUserID(req.headers["x-access-token"]);
  const challengeID = req.body["challenge_id"];
  if (!userID) return res.status(401).send(error_messages.INVALID_ACCESS_TOKEN);
  if (!challengeID) return res.status(400).send(error_messages.MISSING_FIELDS);
  if (isNaN(challengeID)) return res.status(400).send(error_messages.INVALID_FIELDS);

  const challenges = await getChallengeByChallengeIdFromDB(challengeID).catch((err) => {
    return res.status(500).send(error_messages.INTERNAL_ERROR);
  });
  if (challenges.length == 0) return res.status(404).send(error_messages.NO_SUCH_CHALLENGE_FOUND);
  
  const challenge = challenges[0];
  if (challenge['racoon_id'] !== null) return res.status(403).send(error_messages.CHALLENGE_ACCEPTED);
  if (challenge['squirrel_id'] == userID) return res.status(403).send(error_messages.USER_ALREADY_IN_CHALLENGE)

  const result = await updateRacoonIDForChallengeAcceptance(
    challengeID,
    userID
  ).catch((err) => false);
  if (!result) return res.status(500).send(error_messages.INTERNAL_ERROR);

  const sequenceNum = challenge['num_of_sequences_completed']
  if (sequenceNum < 0) return res.status(500).send(error_messages.INTERNAL_ERROR);

  const nextWords = await getWordsForSequenceInChallenge(
    challengeID,
    sequenceNum + 1
  );
  await updateStatusOfChallenge(challengeID, 'ONGOING').catch((err) => {
    return res.status(500).send(err.message);
  });
  await addNotificationChallengeAccepted(challenge['squirrel_id']);
  if (nextWords) return res.status(200).json({ words: nextWords,});
  else return res.status(500).send(error_messages.INTERNAL_ERROR);
};

export const createNewChallenge = async (req, res) => {
  const userID = await getAuthenticatedUserID(req.headers["x-access-token"]);
  const data = req.body;
  if (!userID) {
    return res.status(401).send(error_messages.INVALID_ACCESS_TOKEN);
  }
  if (
    !data ||
    !data.num_of_total_turns ||
    !data.word_limit_per_turn ||
    !data.interest
  )
    return res.status(400).send(error_messages.MISSING_FIELDS);
  if (data.num_of_total_turns !== 4 && data.num_of_total_turns !== 6)
    return res.status(400).send(error_messages.INVALID_FIELDS);
  if (data.word_limit_per_turn !== 1000 && data.word_limit_per_turn !== 1500)
    return res.status(400).send(error_messages.INVALID_FIELDS);

  const challenge = await addChallenge(
    userID,
    data.num_of_total_turns,
    data.word_limit_per_turn,
    data.interest
  ).catch((err) => {
    console.log(err)
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

  const userID = await getAuthenticatedUserID(req.headers["x-access-token"]);
  if (!userID) {
    return res.status(401).send(error_messages.INVALID_ACCESS_TOKEN);
  }
  const { id: challengeID } = req.params;
  const data = req.body;

  if (!data.essay_para || data.title == undefined)
    return res.status(400).send(error_messages.MISSING_FIELDS);
  if (isNaN(challengeID))
    return res.status(400).send(error_messages.INVALID_FIELDS);

  const allPlayerIDs = await getPlayersInChallenge(challengeID).catch((err) =>
    res.status(500).send(err.message)
  );

  const challenges = await getChallengeByChallengeIdFromDB(challengeID);
  const challenge = challenges[0]
  if (allPlayerIDs === undefined || allPlayerIDs.length === 0) {
    return res.status(404).send(error_messages.NO_SUCH_CHALLENGE_FOUND);
  }

  const sequenceNum = challenge['num_of_sequences_completed']

  if (sequenceNum < 0 || sequenceNum >= challenge["num_of_total_turns"]) {
    return res.status(403).send(error_messages.WRONG_TURN);
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

    if (!result) return res.status(500).send(error_messages.INTERNAL_ERROR);

    const newStatus = getNewStatus(sequenceNum + 1, challenge['num_of_total_turns'])

    await updateStatusOfChallenge(challenge['challenge_id'], newStatus).catch((err) => {
      return res.status(500).send(err.message);
    });
    await updateTurnDetails(challengeID).catch((err) => {
      return res.status(500).send(err.message);
    });

    const other_user_uid = userID == challenge['squirrel_id'] ? challenge['racoon_id'] : userID
    await addNotificationForOtherUserOnTurnEnd(other_user_uid, challengeID);

    if (data.title && data.title.length > 0) { 
      updateTitleOfChallenge(challengeID, data.title).then(res => true).catch(err => false);
    }
    return res.status(200).send(OK_MESSAGE);
  } else {
    return res.status(403).send(error_messages.WRONG_TURN);
  }
};

export const getChallengeByChallengeId = async (req, res) => {

  const userID = await getAuthenticatedUserID(req.headers["x-access-token"]);
  if (!userID) {
    return res.status(401).send(error_messages.INVALID_ACCESS_TOKEN);
  }
  const params = req.params;

  if (!params) {
    return res.status(400).send(error_messages.MISSING_FIELDS);
  }

  const challengeID = params["id"];
  const challenges = await getChallengeByChallengeIdFromDB(challengeID);

  if (challenges.length > 1) {
    return res.status(500).send(error_messages.INTERNAL_ERROR);
  }
  if (challenges.length == 0) {
    return res.status(404).send(error_messages.NO_SUCH_CHALLENGE_FOUND);
  }
  const challenge = challenges[0];

  if (challenge["status_of_challenge"] != "COMPLETED") {
    if (
      userID != challenge["squirrel_id"] &&
      userID != challenge["racoon_id"]
    ) return res.status(401).send(error_messages.NOT_IN_THIS_CHALLENGE);
  }

  if (challenge["status_of_challenge"] != "COMPLETED") {
    const sequenceNum = challenge['num_of_sequences_completed']

    if (sequenceNum < 0) return res.status(500).send(error_messages.INTERNAL_ERROR);
    if (sequenceNum < challenge["num_of_total_turns"]) {
      const nextWords = await getWordsForSequenceInChallenge(
        challengeID,
        sequenceNum + 1
      );

      if (nextWords) challenge["words"] = nextWords;
      else res.status(500).send(error_messages.INTERNAL_ERROR);
    }
  }
  const allEssayPara = await getEssayParaFromEssayService(challengeID);
  if (allEssayPara) challenge["essay_paras"] = allEssayPara;
  else res.status(500).send(error_messages.INTERNAL_ERROR);

  const lastModifiedTimeRes = await getLastModifiedTimeForChallenge(
    challengeID
  );
  if (lastModifiedTimeRes.length < 0)
    return res.status(500).send(error_messages.INTERNAL_ERROR);
  const lastModifiedTime =
    lastModifiedTimeRes[0]["time_of_last_completed_sequence"];

  challenge["last_modified_time"] = lastModifiedTime;

  return res.status(200).json(challenge);
};

export const sendTitle = async (req, res) => {
  const title = req.body['title'];
  const challenge_id = req.body['challenge_id'];
  const userID = await getAuthenticatedUserID(req.headers["x-access-token"]);
  if (!userID) {
    return res.status(401).send(error_messages.INVALID_ACCESS_TOKEN);
  }
  if (!title || !challenge_id) return res.status(400).send(error_messages.MISSING_FIELDS);
  if (isNaN(challenge_id)) return res.status(400).send(error_messages.INVALID_FIELDS);
  
  const allPlayerIDs = await getPlayersInChallenge(challengeID).catch((err) =>
    res.status(500).send(err.message)
  );
  if (allPlayerIDs === undefined || allPlayerIDs.length === 0) {
    return res.status(404).send(error_messages.NO_SUCH_CHALLENGE_FOUND);
  }
  if (!allPlayerIDs.includes(userID)) return res.status(403).send(error_messages.NOT_IN_THIS_CHALLENGE);

  const result = updateTitleOfChallenge(challenge_id, title).then(res => true).catch(err => false);
  if (!result) return res.status(500).send(error_messages.INTERNAL_ERROR);
  return res.status(200).send(OK_MESSAGE)
}

const getNewStatus = (newSequenceNum, num_of_total_turns) => {
  if (newSequenceNum == 0) return 'DRAFT'
  if (newSequenceNum == 1) return 'WAITING_MATCH';
  if (newSequenceNum >= num_of_total_turns) return 'COMPLETED';
  if (newSequenceNum > 1) return 'ONGOING';
  else return 'INVALID';
}

export const getAllChallengesNotAccepted = async (req, res) => {
  const userID = await getAuthenticatedUserID(req.headers["x-access-token"]);
  if (!userID) {
    return res.status(401).send(error_messages.INVALID_ACCESS_TOKEN);
  }
  let challenges = await getAllChallengesWaitingMatchFromDB();
  challenges = challenges.filter(ele => ele['squirrel_id'] != userID)
  return res.status(200).send(challenges)
}

const getAuthenticatedUserID = async (accessToken) => {
  return await getAuthenticatedUserIDFromAuthService(accessToken);
}