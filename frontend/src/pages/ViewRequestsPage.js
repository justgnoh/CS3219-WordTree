import React, { useEffect, useState } from 'react'
import { Table, Badge, Button, Breadcrumb } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { getChallengeRequests, acceptChallenge } from '../utils/Api';

export default function ViewRequestsPage() {
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    const [awaitingChallengeList, setAwaitingChallengeList] = useState([]);

    useEffect(async () => {
        if (user) {
            const token = await user.getIdToken();
            getChallengeRequests(token).then(resp => {
                setAwaitingChallengeList(resp.data);
            });
        }
    }, [user]);

    function accept(challengeData) {
        // if (challengeData)
        console.log(challengeData);
        console.log("hello")
        // const token = await user.getIdToken();
        // await acceptChallenge(token, challengeData.challenge_id);
        // history.push("/challenge/" + challengeData.challenge_id);
    }

    let awaitingChallengeData = [];
    for (let i = 0; i < awaitingChallengeList.length; i++) {
        let isOwnRequest = false;
        if (awaitingChallengeList[i].squirrel_id == user.uid) {
            isOwnRequest = true;
        }

        awaitingChallengeData.push(
            <tr>
                <td>{awaitingChallengeList[i].challenge_id}</td>
                <td>{awaitingChallengeList[i].squirrel_id}</td>
                <td><Badge pill bg="warning" className="black-text">{awaitingChallengeList[i].interest}</Badge></td>
                {/* TODO: Not in 2/4 turn level */}
                <td>{awaitingChallengeList[i].num_of_total_turns} rounds</td>
                <td>
                    {awaitingChallengeList[i].word_limit_per_turn} char limit
                </td>
                <td>
                    {isOwnRequest ? <Button variant="dark" size="sm" className="primary-color" disabled>Accept</Button> 
                    : <Button variant="dark" size="sm" className="primary-color" onClick={() => {
                        console.log(awaitingChallengeList[i]);
                        const challengeData = awaitingChallengeList[i];
                        console.log(challengeData.challenge_id);
                        
                        user.getIdToken()
                        .then((token) => {
                            acceptChallenge(token, challengeData.challengeId);
                        })
                        history.push("/challenge/" + challengeData.challenge_id);
                    }}>Accept</Button>}
                    
                </td>
            </tr>)
    }

    return (
        <div>
            <div className="ms-5 me-5">
                <h1>View Challenge Requests</h1>
                <Breadcrumb>
                    <Breadcrumb.Item href="/challenge">Challenges</Breadcrumb.Item>
                    <Breadcrumb.Item active>View challenge requests</Breadcrumb.Item>
                </Breadcrumb>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Interests</th>
                            <th>Turns</th>
                            <th>Word Limit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {awaitingChallengeData}
                        <tr onClick={() => console.log("clicked on row")}>
                            <td>dp</td>
                            <td>Arthur</td>
                            <td>
                                <Badge pill bg="warning" className="black-text">Horror</Badge>
                                <Badge pill bg="warning" className="black-text">Sci-Fi</Badge>
                            </td>
                            <td>
                                4 rounds
                            </td>
                            <td>
                                300 word limit
                            </td>
                            <td>
                                <Button variant="dark" size="sm" className="primary-color" onClick={() => {
                                    history.push("/challenge/arthur");
                                }}>Accept</Button>
                            </td>
                        </tr>
                        <tr onClick={() => console.log("clicked on row")}>
                            <td>user.uid</td>
                            <td>Kevin</td>
                            <td>
                                <Badge pill bg="warning" className="black-text">Crime</Badge>
                            </td>
                            <td>
                                6 rounds
                            </td>
                            <td>
                                500 word limit
                            </td>
                            <td>
                                <Button variant="dark" size="sm" className="primary-color">Accept</Button>
                            </td>
                        </tr>

                    </tbody>
                </Table>

            </div>
        </div>
    )
}
