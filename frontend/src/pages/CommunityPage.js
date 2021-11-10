import React, { useEffect, useState } from 'react'
import { Table, Button, Badge, Spinner } from 'react-bootstrap';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useHistory } from 'react-router';
import { BsArrowUpSquare, BsArrowUpSquareFill } from 'react-icons/bs';

import { getCommunityChallenges, removeVoteCompletedEssay, upVoteCompletedEssay } from '../utils/Api';


export default function CommunityPage() {
    const [user] = useAuthState(auth);
    const [communityChallengeList, setCommunityChallengeList] = useState([]);
    const history = useHistory();

    useEffect(async () => {
        if (user) {
            const token = await user.getIdToken();
            getCommunityChallenges(token).then((resp) => {
                if (resp) {
                    setCommunityChallengeList(resp.data);
                    console.log(resp.data)
                }
            });
        }
    }, [user]);

    let emptyChallengeData = [];
    if (user) {
        emptyChallengeData.push(
            <tr>
                <td>There are no completed challenges.</td>
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

    let communityChallengeData = [];
    for (let i = 0; i < communityChallengeList.length; i++) {
        const current = communityChallengeList[i];
        communityChallengeData.push(
            <tr>
                <td>{current.challenge_id}</td>
                <td>{current.upvotes} {' '}
                    {current.upvoted == null ? <BsArrowUpSquare className={"upvote-button"} onClick={async () => {
                        const reqBody = {
                            "uid1": current.squirrel_id,
                            "uid2": current.racoon_id,
                            "cid": current.challenge_id
                        }
                        const token = await user.getIdToken();
                        await upVoteCompletedEssay(token, reqBody).then(() => history.go(0))
                    }} /> : <BsArrowUpSquareFill className={"upvote-button"} onClick={async () => {
                        const reqBody1 = {
                            "uid1": current.squirrel_id,
                            "uid2": current.racoon_id,
                            "cid": current.challenge_id
                        }
                        const token1 = await user.getIdToken();
                        await removeVoteCompletedEssay(token1, reqBody1).then(() => history.go(0));
                    }} />}
                </td>
                <td>{current.title}</td>
                <td>
                    <Badge pill bg="warning" className="black-text">{current.interest}</Badge>
                </td>
                <td>
                    <Badge pill bg="success">{current.squirrel_name}</Badge>
                    ,
                    <Badge pill bg="success">{current.racoon_name}</Badge>
                </td>
                <td>{current.num_of_total_turns}</td>
                <td>
                    <Button variant="dark" size="sm" className="primary-color" onClick={() => {
                        history.push("/community/" + current.challenge_id);
                    }}>View</Button>
                </td>
            </tr>
        )
    }

    return (
        <div className="ms-5 me-5">
            <div className="d-flex justify-content-center">
                <h1>Welcome to the Treehouse!</h1>
            </div>
            <div className="d-flex justify-content-center">
                <h5>Here are a list of completed essays that you can read. Upvote if you think an essay is great or speaks to you!</h5>
            </div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Upvotes</th>
                        <th>Title</th>
                        <th>Interest</th>
                        <th>Authors</th>
                        <th>Turns</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {communityChallengeData.length == 0 ? emptyChallengeData : communityChallengeData}
                </tbody>
            </Table>
        </div>
    )
}
