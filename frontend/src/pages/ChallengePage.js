import React, { useEffect, useState } from 'react'
import { Button, Table, Badge } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { getChallengesForUserId } from '../utils/Api';

export default function ChallengePage() {
    const [user, loading, error] = useAuthState(auth);
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

    function makeBadge(value) {
        if (value == "DRAFT") {
            return <Badge pill bg="secondary">{value}</Badge>
        }
    }

    let challengeData = [];
    for (let i = 0; i < challengeList.length; i++) {
        challengeData.push(
        <tr>
            <td>{challengeList[i].challenge_id}</td>
            <td>{challengeList[i].title}</td>
            <td>{challengeList[i].racoon_id}</td>
            <td>{challengeList[i].interest}</td>
            {/* TODO: Not in 2/4 turn level */}
            <td>{challengeList[i].num_of_total_turns}</td>
            <td>
                {makeBadge(challengeList[i].status_of_challenge)}
            </td>
            <td>
                <Button variant="dark" size="sm" className="primary-color" onClick={()=> {
                            history.push("/challenge/" + challengeList[i].challenge_id);
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
                    <th>Racoon Name</th>
                    <th>Interest</th>
                    <th>Turns</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {challengeData}
                    <tr>
                        <td>1</td>
                        <td>The Story of a man</td>
                        <td>Arthur</td>
                        <td>
                            <Badge pill bg="warning" className="black-text">Horror</Badge>
                            <Badge pill bg="warning" className="black-text">Sci-Fi</Badge>
                        </td>
                        <td>
                            2/4 rounds
                        </td>
                        <td>
                            <Badge pill bg="success">Your Turn</Badge>
                        </td>
                        <td>
                        <Button variant="dark" size="sm" className="primary-color" onClick={()=> {
                            history.push("/challenge/arthur");
                        }}>View</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>dp</td>
                        <td>The Story of a man</td>
                        <td>Kevin</td>
                        <td>
                            <Badge pill bg="warning" className="black-text">Crime</Badge>
                        </td>
                        <td>
                            3/6 rounds
                        </td>
                        <td>
                            <Badge pill bg="danger">Awaiting Turn</Badge>
                        </td>
                        <td>
                        <Button variant="dark" size="sm" className="primary-color">View</Button>
                        </td>
                    </tr>

                </tbody>
            </Table>
            
        </div>
    )
}
