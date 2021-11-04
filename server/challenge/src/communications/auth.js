import axios from "axios";


const AUTH_SERVICE_HOST = "http://auth-service:8080";

export const getAuthenticatedUserIDFromAuthService = async (accessToken) => {
    if (!accessToken) {
      return false;
    }
    console.log(accessToken)
    const requestUrl = AUTH_SERVICE_HOST;
    return await axios
      .get(requestUrl, {headers: {
          "x-access-token": accessToken
      }})
      .then((res) => {
          console.log(res)
          if (res.status == 200) {
              if (res.data['uid']) return res.data['uid'];
          }
          return false;
      })
      .catch((err) => err);
  };
  