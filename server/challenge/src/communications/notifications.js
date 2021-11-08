import axios from "axios";


// const NOTIF_SERVICE_HOST = "http://notification-service:8080/";
const NOTIF_SERVICE_HOST = "http://localhost:5016/";

export const addNotificationChallengeAccepted = async (squirrel_id, challenge_id) => {
    if (!squirrel_id || !challenge_id) return false
    let resBody = {
        "userId": squirrel_id,
        "notification": "Your challenge has been accepted, go check it out!",
        "notificationLink": `/challenge/${challenge_id}`
    }
    const requestUrl = NOTIF_SERVICE_HOST + "/addNotification";
    return await axios
      .post(requestUrl, {data: resBody})
      .catch((err) => false);
  };

export const addNotificationForOtherUserOnTurnEnd = async (opp_id, challenge_id) => {
if (!opp_id || opp_id == null|| !challenge_id) return false
let resBody = {
    "userId": opp_id,
    "notification": "Your challenge has been accepted, go check it out!",
    "notificationLink": `/challenge/${challenge_id}`
}
const requestUrl = NOTIF_SERVICE_HOST + "/addNotification";
return await axios
    .post(requestUrl, {data: resBody})
    .catch((err) => false);
};
  