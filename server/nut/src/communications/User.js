import axios from "axios";

const USER_SERVICE_URL = "http://user-service:8080/user/updateUserTotalNut";

export async function updateUserTotalNut(reqUserId, userTotalNut) {
    axios.put(USER_SERVICE_URL, { userId: reqUserId, totalNut: userTotalNut })
            .catch(err => { /* do nothing */ });
};
