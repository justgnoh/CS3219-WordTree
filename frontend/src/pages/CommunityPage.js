import React, { useEffect, useState } from 'react'
import { Table, Button, Badge } from 'react-bootstrap';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useHistory } from 'react-router';
import { BsArrowUpSquare } from 'react-icons/bs';

import { getCommunityChallenges, getCommunityChallengeById } from '../utils/Api';


export default function CommunityPage() {
    const [user, loading, error] = useAuthState(auth);
    const [communityChallengeList, setCommunityChallengeList] = useState([]);
    const history = useHistory();
    
    // For visual purposes
    let rows = [];
    for (let i = 0; i < 50; i++) {
        rows.push(<tr>
            {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index} <BsArrowUpSquare/> </td>
        ))}</tr>)
    }

    useEffect(async () => {
        if (user) {
            const token = await user.getIdToken();
            getCommunityChallenges(token).then((resp) => {
                setCommunityChallengeList(resp.data);
                console.log(resp.data)
            });
        }
    }, [user]);

    let communityChallengeData = [];
    for (let i = 0; i < communityChallengeList.length; i++) {
        const current = communityChallengeList[i];
        communityChallengeData.push(
            <tr>
               <td>{current.challenge_id}</td>
               <td>{current.upvotes} <BsArrowUpSquare className={"upvote-button"} onClick={() => console.log("upvote")}/></td>
               <td>{current.title}</td>
               <td>{current.interest}</td>
               <td>
                    <Badge pill bg="success">{current.squirrel_name}</Badge>
                    ,
                    <Badge pill bg="success">{current.racoon_name}</Badge>
                </td>
               <td>20-09-2021</td>
               <td>{current.num_of_total_turns}</td>
               <td>
                    <Button variant="dark" size="sm" className="primary-color" onClick={async () => {
                        const token = await user.getIdToken();
                        const challenge = await getCommunityChallengeById(token, current.challenge_id)
                        console.log(challenge);
                        history.push("/community/" + current.challenge_id);
                        console.log("View Challenge Id:" + current.challenge_id);
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
                        <th>Id</th>
                        <th>Upvotes</th>
                        <th>Title</th>
                        <th>Interest</th>
                        <th>Authors</th>
                        <th>Date Completed</th>
                        <th>Turns</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {communityChallengeData}
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}
