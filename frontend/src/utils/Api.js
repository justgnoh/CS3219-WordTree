import axios from 'axios';

const API_HOST = 'http://localhost:80';

// ===============================
// CHALLENGE SERVICE
// ===============================
export async function createNewChallenge(challengeDetails) {
    try {
        const resp = await axios.post(API_HOST + '/challenge/', {
            squirrel_id: challengeDetails.uid,
            num_of_total_turns: challengeDetails.turns,
            word_limit_per_turn: challengeDetails.wordLimit,
            genre: challengeDetails.interests
        });

        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function getChallengeById(challengeId) {
    try {
        const resp = await axios.get(API_HOST + '/challenge/' + challengeId);
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function addEssayPara(challengeId) {
    try {
        const resp = await axios.put(API_HOST + '/challenge/' + challengeId);
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function getChallengesForUserId(userId) {
    try {
        const resp = await axios.get(API_HOST + '/challenge/' + userId);
        return resp;
    } catch (err) {
        console.log(err);
    }
}

// ===============================
// USER SERVICE
// ===============================
export async function createUserAccount(formData) {
    try {
        const resp = await axios.get(API_HOST + '/user/createUser');
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function getUserProfile(userId) {
    try {
        const resp = await axios.get(API_HOST + '/getUserProfile/' + userId);
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function updateUserProfile(userId, formData) {
    try {
        const resp = await axios.put(API_HOST + '/user/updateUserProfile', {
            userId: formData.uid,
            name: formData.name,
            dateOfBirth: formData.dob
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