import React, { useEffect, useState } from 'react'
import { Table, Badge, Button, Breadcrumb, Spinner } from 'react-bootstrap';
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
                console.log(resp.data);
                setAwaitingChallengeList(resp.data);
            });
        }
    }, [user]);

    let emptyChallengeData = [];
    emptyChallengeData.push(
        <tr>
            <br></br>
            <Spinner animation="border" variant="success" />
        </tr>
    )

    let awaitingChallengeData = [];
    for (let i = 0; i < awaitingChallengeList.length; i++) {
        let isOwnRequest = false;
        if (awaitingChallengeList[i].squirrel_id == user.uid) {
            isOwnRequest = true;
        }

        awaitingChallengeData.push(
            <tr>
                <td>{awaitingChallengeList[i].challenge_id}</td>
                <td>{awaitingChallengeList[i].squirrel_name}</td>
                <td>{awaitingChallengeList[i].title}</td>
                <td><Badge pill bg="warning" className="black-text">{awaitingChallengeList[i].interest}</Badge></td>
                {/* TODO: Not in 2/4 turn level */}
                <td>{awaitingChallengeList[i].num_of_total_turns} rounds</td>
                <td>
                    {awaitingChallengeList[i].word_limit_per_turn} char limit
                </td>
                <td>
                    {isOwnRequest ? <Button variant="dark" size="sm" className="primary-color" disabled>Accept</Button> 
                    : <Button variant="dark" size="sm" className="primary-color" onClick={async () => {
                        console.log(awaitingChallengeList[i]);
                        const challengeData = awaitingChallengeList[i];
                        console.log(challengeData.challenge_id);

                        const challengeId = challengeData.challenge_id;
                        await user.getIdToken()
                        .then((token) => {
                            console.log(challengeData.challenge_id);
                            acceptChallenge(token, challengeId);
                        }).then(() => {
                            history.push("/challenge/" + challengeData.challenge_id);
                        });
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
                            <th>Squirrel</th>
                            <th>Title</th>
                            <th>Interests</th>
                            <th>Turns</th>
                            <th>Word Limit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {awaitingChallengeData.length == 0 ? emptyChallengeData : awaitingChallengeData}
                    </tbody>
                </Table>

            </div>
        </div>
    )
}
