import axios from 'axios';

const API_HOST = 'http://localhost:80';
// const API_HOST = 'http://071d-103-252-200-244.ngrok.io'

// ===============================
// CHALLENGE SERVICE
// ===============================
export async function createNewChallenge(challengeDetails, token) {
    try {
        const resp = await axios.post(API_HOST + '/challenge/', {
            "squirrel_id": challengeDetails.uid,
            "num_of_total_turns": challengeDetails.turns,
            "word_limit_per_turn": challengeDetails.wordLimit,
            "interest": challengeDetails.interest
        }, {
            headers: {
                'x-access-token': `${token}`,
            }
        });
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function getChallengeById(token, challengeId) {
    try {
        const resp = await axios.get(API_HOST + '/challenge/' + challengeId, {
            headers: {
                'x-access-token': `${token}`,
              }
        });
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function addEssayPara(token, challengeId, essay, title) {
    try {
        const resp = await axios.put(API_HOST + '/challenge/' + challengeId, {
            "essay_para": essay,
            "title": title
        },{
            headers: {
                'x-access-token': `${token}`,
              }
        });
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function getChallengeRequests(token) {
    try {
        const resp = await axios.get(`${API_HOST}/challenge/waiting`, {
            headers: {
                'x-access-token': `${token}`,
              }
        })
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function getChallengesForUserId(token) {
    try {       
        const resp = await axios.get(`${API_HOST}/challenge`, {
            headers: {
                'x-access-token': `${token}`,
            }
        })
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function acceptChallenge(token, challengeId) {
    try {     
        const resp = await axios.get(`${API_HOST}/challenge/` + challengeId, {
            headers: {
                'x-access-token': `${token}`
              }
        })
        return resp;
    } catch (err) {
        console.log(err);
    }
}

// ===============================
// USER SERVICE
// ===============================
export async function createUserAccount(token, formData) {
    try {
        const resp = await axios.post(API_HOST + '/user/createUser', {
            "userId" : formData.userId,
            "email" : formData.email,
            "password" : formData.password,
            "name" : formData.name,
            "dateOfBirth" : formData.dateOfBirth
        }, { 
            headers: {
                'x-access-token': `${token}`
            }
        });
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function getUserProfile(token) {
    try {
        const resp = await axios.get(API_HOST + '/user/getUserProfile', {
            headers: {
                'x-access-token': `${token}`
            }
        });
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function updateUserProfile(token, formData) {
    try {
        const resp = await axios.put(API_HOST + '/user/updateUserProfile', {
            "userId": formData.uid,
            "name": formData.name,
            "dateOfBirth": formData.dob
        }, {
            headers: {
                'x-access-token': `${token}`
            }
        });
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function getSystemInterests() {
    try {
        const resp = await axios.get(API_HOST + '/user/getInterest');
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function updateUserInterests(token, interests) {
    try {
        
        const resp = await axios.put(API_HOST + '/user/updateUserInterest', {
            "interest": interests
        } ,{
            headers: {
                'x-access-token': `${token}`,
              }
        })
        return resp;
    } catch (err) {
        console.log(err);
    }
}


// ===============================
// NUT SERVICE
// ===============================
// export async function 


export async function getChallenges(userId, challengeId) {
    return await axios.get(API_HOST + '/community/getChallenge');
}

export async function getCommunityChallenges(userId) {
    const result = await axios.get(API_HOST + '/community/listChallenges' + userId);
    return result;
}


// NUT SERVICE
export async function getAllNuts(userId) {
    return await axios.get(API_HOST + '/nut/viewUserNut/' + userId);
}

export async function removeCommunityNut() {
    // Delete request
    // {user.uid}, 
}