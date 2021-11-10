import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import { Breadcrumb, Table, Badge, Spinner, Card } from 'react-bootstrap';
import { getCommunityChallengeById, upVoteEssayPara, removeVoteEssayPara } from '../utils/Api'
import { BsArrowUpSquare, BsArrowUpSquareFill } from 'react-icons/bs';

export default function ViewCompletedChallenge() {
    const { cid } = useParams();
    const [user] = useAuthState(auth);
    const history = useHistory();
    const [essayThusFar, setEssayThusFar] = useState('');
    const [challengeData, setChallengeData] = useState({
        challenge: {
            challenge_id: "invalid"
        },
        essay_para: []
    });
    const [upvoted, setUpvoted] = useState(false);

    useEffect(async () => {
        if (user) {
            const token = await user.getIdToken();
            getCommunityChallengeById(token, cid).then((resp) => {
                console.log(resp.data)
                appendParas(resp.data.essayPara);
                setChallengeData(resp.data);
            });
        }
    }, [user]);

    function appendParas(data) {
        console.log(data);
        const allParaSegments = data;
        let combinedSegments = '';
        for (let i = 0; i < allParaSegments.length; i++) {
            combinedSegments += data[i].essay_para + " ";
        }
        setEssayThusFar(combinedSegments + " ");
    }

    let emptyChallengeData = [];
    emptyChallengeData.push(
        <tr>
            <br></br>
            <Spinner animation="border" variant="success" />
        </tr>
    )

    let essayData = [];
    if (challengeData.essayPara) {
        for (let i = 0; i < challengeData.essayPara.length; i++) {
            if (i % 2 == 0) {
                essayData.push(
                    <Card className="mt-3 primary-beige">
                        <Card.Header>
                            <span style={{ "fontWeight": "bold" }}>Squirrel:</span> {' '}
                            {challengeData.challengeUser[0].user_name} {' '}

                            {challengeData.essayPara[i].upvoted == null ? <BsArrowUpSquare className={"upvote-button"} onClick={async () => {
                                const reqBody = {
                                    "uid1": challengeData.challengeUser[0].user_id,
                                    "cid": challengeData.challenge.challenge_id,
                                    "seqNum": challengeData.essayPara[i].seq_num
                                }
                                const token = await user.getIdToken();
                                await upVoteEssayPara(token, reqBody);
                                setUpvoted(true);
                            }} />
                                : <BsArrowUpSquareFill className={"upvote-button"} onClick={async () => {
                                    const reqBody1 = {
                                        "uid1": challengeData.challengeUser[1].user_id,
                                        "cid": challengeData.challenge.challenge_id,
                                        "seqNum": challengeData.essayPara[i].seq_num
                                    }
                                    const token1 = await user.getIdToken();
                                    await removeVoteEssayPara(token1, reqBody1);
                                    setUpvoted(false);
                                }} />}

                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {challengeData.essayPara[i].essay_para}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            } else {
                essayData.push(
                    <Card className="mt-3">
                        <Card.Header>
                            <span style={{ "fontWeight": "bold" }}>Racoon:</span> {' '}
                            {challengeData.challengeUser[1].user_name} {' '}
                            {challengeData.essayPara[i].upvoted == null ? <BsArrowUpSquare className={"upvote-button"} onClick={async () => {
                               const reqBody = {
                                "uid1": challengeData.challengeUser[0].user_id,
                                "cid": challengeData.challenge.challenge_id,
                                "seqNum": challengeData.essayPara[i].seq_num
                            }
                            const token = await user.getIdToken();
                            await upVoteEssayPara(token, reqBody);
                            }} />
                                : <BsArrowUpSquareFill className={"upvote-button"} onClick={async () => {
                                    const reqBody1 = {
                                        "uid1": challengeData.challengeUser[1].user_id,
                                        "cid": challengeData.challenge.challenge_id,
                                        "seqNum": challengeData.essayPara[i].seq_num
                                    }
                                    const token1 = await user.getIdToken();
                                    await removeVoteEssayPara(token1, reqBody1);
                                }} />}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {challengeData.essayPara[i].essay_para}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            }
        }
    }

    return (
        <div className="ms-5 me-5">
            <h1>Completed Challenge</h1>
            <Breadcrumb>
                <Breadcrumb.Item href="# " onClick={history.goBack}>Go back</Breadcrumb.Item>
                <Breadcrumb.Item active>Challenge ID: {cid}</Breadcrumb.Item>
            </Breadcrumb>

            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Upvotes</th>
                        <th>Title</th>
                        <th>Interest</th>
                        <th>Authors</th>
                        <th>Turns</th>
                    </tr>
                </thead>
                {challengeData.challenge.challenge_id == "invalid" ? emptyChallengeData :
                    <tbody>
                        <tr>
                            <td>{challengeData.challenge.challenge_id}</td>
                            <td>{challengeData.challenge.upvotes}</td>
                            <td>{challengeData.challenge.title}</td>
                            <td>{challengeData.challenge.interest}</td>
                            <td>
                                <Badge pill bg="success">{challengeData.challengeUser[0].user_name}</Badge>
                                ,
                                <Badge pill bg="success">{challengeData.challengeUser[1].user_name}</Badge>
                            </td>
                            <td>{challengeData.challenge.num_of_total_turns}</td>
                        </tr>
                    </tbody>
                }
            </Table>

            <Card>
                <Card.Header>Completed Essay</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {essayThusFar.length == 0 ? <Spinner animation="border" variant="success" /> : essayThusFar}
                    </Card.Text>
                </Card.Body>
            </Card>

            {essayData}

        </div>
    )
}
