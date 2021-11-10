import axios from "axios";

const AUTH_SERVICE_URL = "http://auth-service:8080/";

export async function getAuthenticatedUserId(accessToken) {
    if (!accessToken) {
        return false;
    }
    try {
        const result = await axios.get(AUTH_SERVICE_URL, { headers: { "x-access-token": accessToken } });
        if (result.status != 200) {
            console.log(result);
            return false;
        }
        return result.data.uid;
    } catch (err) {
        console.log(err);
        return false;
    }
};
