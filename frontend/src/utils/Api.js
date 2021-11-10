import axios from 'axios';

const API_HOST = 'http://localhost:80';

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
        const resp = await axios.post(`${API_HOST}/challenge/accept`, {
            "challenge_id": challengeId
        }, {
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
            "userId": formData.userId,
            "email": formData.email,
            "password": formData.password,
            "name": formData.name,
            "dateOfBirth": formData.dateOfBirth
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
        }, {
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
// Community SERVICE
// ===============================
export async function getCommunityChallengeById(token, challengeId) {
    try {
        return await axios.get(API_HOST + '/community/getChallenge/' + challengeId, {
            headers: {
                'x-access-token': `${token}`
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export async function getCommunityChallenges(token) {
    try {
        const offset = "0";
        const limit = "default";
        const result = await axios.get(API_HOST + '/community/listChallenges/' + offset + "/50", {
            headers: {
                'x-access-token': `${token}`
            }
        });
        return result;
    } catch (err) {
        console.log(err);
    }

}


// ===============================
// NUT SERVICE
// ===============================
export async function getAllNuts(userId) {
    try {
        return await axios.get(API_HOST + '/nut/getUserNut/' + userId);
    } catch (err) {
        console.log(err);
    }

}

export async function getTotalNuts(token) {
    try {
        return await axios.get(API_HOST + '/nut/getUserTotalNut', {
            headers: {
                'x-access-token': `${token}`
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export async function upVoteCompletedEssay(token, formData) {
    try {
        return await axios.post(API_HOST + '/nut/addCommunityChallengeNut', {
            "upvotedUserId1": formData.uid1,
            "upvotedUserId2": formData.uid2,
            "challengeId": formData.cid
        }, {
            headers: {
                'x-access-token': `${token}`
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export async function removeVoteCompletedEssay(token, formData) {
    try {
        return await axios.delete(API_HOST + '/nut/deleteCommunityChallengeNut', {
            data: {
                "upvotedUserId1": formData.uid1,
                "upvotedUserId2": formData.uid2,
                "challengeId": formData.cid
            }, headers: {
                'x-access-token': `${token}`
            }
        });
    } catch (err) {
        console.log(err);
    }
}


export async function upVoteEssayPara(token, formData) {
    return await axios.post(API_HOST + '/nut/addCommunityEssayNut', {
        "upvotedUserId": formData.uid1,
        "challengeId": formData.cid,
        "seqNum": formData.seqNum
    }, {
        headers: {
            'x-access-token': `${token}`
        }
    });
}

export async function removeVoteEssayPara(token, formData) {
    return await axios.delete(API_HOST + '/nut/deleteCommunityEssayNut', {
        data: {
            "upvotedUserId": formData.uid1,
            "challengeId": formData.cid,
            "seqNum": formData.seqNum
        }, headers: {
            'x-access-token': `${token}`
        }
    });
}



