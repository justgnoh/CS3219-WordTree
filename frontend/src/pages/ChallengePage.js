import React, { useEffect, useState } from 'react'
import { Button, Table, Badge, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { getChallengesForUserId } from '../utils/Api';

export default function ChallengePage() {
    const [user] = useAuthState(auth);
    const history = useHistory();
    const [challengeList, setChallengeList] = useState([]);

    useEffect(async () => {
        if (user) {
            const token = await user.getIdToken();
            getChallengesForUserId(token).then((resp) => {
                console.log(resp.data)
                setChallengeList(resp.data);
            });
        }
    }, [user]);

    function determineTurn(id, seq, squirrelId, racoonId) {
        if (seq % 2 == 0) {
            console.log('Squirrels turn');
            if (id == squirrelId) {
                return true;
            }

            if (id == racoonId) {
                return false;
            }
        }

        if (seq % 2 == 1) {
            console.log('Racoons Turn')
            if (id == racoonId) {
                return true;
            }

            if (id == squirrelId) {
                return false;
            }
        }
    }

    function makeBadge(challengeData) {
        const status = challengeData.status_of_challenge;
        const curr_seq = challengeData.num_of_sequences_completed;
        const squirrel_id = challengeData.squirrel_id;
        const racoon_id = challengeData.racoon_id;
        const userId = user.uid;

        const isMyTurn = determineTurn(userId, curr_seq, squirrel_id, racoon_id);

        if (status == "DRAFT") {
            return <Badge pill bg="secondary">{status}</Badge>
        } else if (status == "WAITING_MATCH") {
            return <Badge pill bg="secondary">Awaiting Match</Badge>
        } else if (status == "ONGOING") {
            if (isMyTurn) {
                return <Badge pill bg="success">Your Turn</Badge>
            } else {
                return <Badge pill bg="danger">Awaiting Turn</Badge>
            }
        } else if (status == "COMPLETED") {
            return <Badge pill bg="success">Completed</Badge>
        }
    }

    let emptyChallengeData = [];
    if (user) {
        emptyChallengeData.push(
            <tr>
                <td>There are no challenges created.</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        )
    } else {
        emptyChallengeData.push(
            <tr>
                <br></br>
                <Spinner animation="border" variant="success" />
            </tr>
        )
    }

    let challengeData = [];
    for (let i = 0; i < challengeList.length; i++) {
        challengeData.push(
        <tr>
            <td>{challengeList[i].challenge_id}</td>
            <td>{challengeList[i].title}</td>
            <td>{challengeList[i].squirrel_name}</td>
            <td>{challengeList[i].racoon_name}</td>
            <td><Badge pill bg="warning" className="black-text">{challengeList[i].interest}</Badge></td>
            <td>{challengeList[i].num_of_sequences_completed}/{challengeList[i].num_of_total_turns}</td>
            <td>
                {makeBadge(challengeList[i])}
            </td>
            <td>
                <Button variant="dark" size="sm" className="primary-color" onClick={()=> {
                    const status = challengeList[i].status_of_challenge;
                    if (status == "COMPLETED") {
                        history.push("/community/" + challengeList[i].challenge_id);
                    } else {
                        history.push("/challenge/" + challengeList[i].challenge_id);
                    }
                }}>View</Button>
            </td>
        </tr>)
    }

    return (
        <div className="ms-5 me-5">
            <div className="d-flex justify-content-center ">
                <Button variant="dark" className="primary-color m-3" onClick={()=>history.replace("/challenge/create")}>Create a new challenge request</Button>
                <Button variant="dark" className="primary-color m-3" onClick={()=>history.replace("/challenge/view")}>View challenge requests</Button>
            </div>

            <Table responsive>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Squirrel Name</th>
                    <th>Racoon Name</th>
                    <th>Interest</th>
                    <th>Turns</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {challengeData.length == 0 ? emptyChallengeData : challengeData}
                </tbody>
            </Table>
            
        </div>
    )
}
