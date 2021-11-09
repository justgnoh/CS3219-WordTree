import axios from "axios";

const NUT_SERVICE_URL = "http://nut-service:8080/nut/";

export async function getUserNut(userId) {
    try {
        const result = await axios.get(NUT_SERVICE_URL + "getUserNut/" + userId);
        return result;
    } catch (err) {
        throw err;
    }
};
