import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, InputGroup, FormControl, Breadcrumb, Modal, Spinner } from 'react-bootstrap';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useParams, useHistory } from 'react-router-dom';
import { getChallengeById, addEssayPara } from '../utils/Api';

export default function Challenge() {
    const { cid } = useParams();
    const history = useHistory();
    const [wordCount, setWordCount] = useState(0);
    const [countExceeded, setCountExceeded] = useState(false);
    const [user] = useAuthState(auth);
    const [essay, setEssay] = useState('');
    const [essayThusFar, setEssayThusFar] = useState('');
    const [title, setTitle] = useState('');
    const [isMyTurn, setIsMyTurn] = useState(false);

    // Modals
    const [show, setShow] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false);
    const [showZeroWordCountModal, setShowZeroWordCountModal] = useState(false);

    // Badges
    const [word1Used, setWord1Used] = useState(false);
    const [word2Used, setWord2Used] = useState(false);
    const [word3Used, setWord3Used] = useState(false);

    // Nut Count
    const [nutCount, setNutCount] = useState(0);

    // Word Prompts
    const [words, setWords] = useState([]);

    const [challengeData, setChallengeData] = useState({
        racoon_id: '',
        essay_paras: []
    });


    useEffect(async () => {
        if (user) {
            const token = await user.getIdToken();
            getChallengeById(token, cid).then((resp) => {
                if (resp) {
                    determineTurn(resp.data);
                    setWords(resp.data.words);
                    appendParas(resp.data);
                    setChallengeData(resp.data);
                    setTitle(resp.data.title);
                }
            });
        }
    }, [user]);

    function handleClose() {
        setShowSuccessModal(false);
        setShowFailureModal(false);
        setShowZeroWordCountModal(false);
    }

    function handleShow() {
        if (wordCount >= challengeData.word_limit_per_turn) {
            setShowFailureModal(true);
        }
        else if (wordCount === 0) {
            setShowZeroWordCountModal(true);
        }
        else {
            setShowSuccessModal(true);
        }
    }

    function handleWordCount(e) {
        e.preventDefault();
        const essayData = e.target.value;
        const wordCount = essayData.length

        setEssay(essayData);
        setWordCount(wordCount);
        checkWordUsage(essayData);
        checkNutsEarned(essayData);

        if (wordCount < challengeData.word_limit_per_turn) {
            setCountExceeded(false);
        }

        if (wordCount >= challengeData.word_limit_per_turn) {
            setCountExceeded(true);
        }
    }

    function checkWordUsage(d) {
        if (d.includes(words[0])) {
            setWord1Used(true);
        }
        if (d.includes(words[1])) {
            setWord2Used(true);
        }
        if (d.includes(words[2])) {
            setWord3Used(true);
        }

        if (!d.includes(words[0])) {
            setWord1Used(false);
        }
        if (!d.includes(words[1])) {
            setWord2Used(false);
        }
        if (!d.includes(words[2])) {
            setWord3Used(false);
        }
    }

    function checkNutsEarned(d) {
        var count = 0;

        words.forEach(element => {
            if (d.includes(element)) {
                console.log('plus');
                count++;
            }
        });

        setNutCount(count);
    }

    function appendParas(data) {
        const allParaSegments = data.essay_paras;
        let combinedSegments = '';
        for (let i = 0; i < allParaSegments.length; i++) {
            combinedSegments += (data.essay_paras[i].essay_para + " ");
        }
        setEssayThusFar(combinedSegments);
    }

    function determineTurn(data) {
        const userID = user.uid;
        if (data.essay_paras.length % 2 == 0) {
            // if i am squirrel -> my turn
            // if i am racoon -> not my turn
            if (userID == data.squirrel_id) {
                setIsMyTurn(true);
            }

            if (userID == data.racoon_id) {
                setIsMyTurn(false);
            }
        }

        if (data.essay_paras.length % 2 == 1) {
            // if i am racoon -> my turn
            // if i am squirrel -> not my turn
            if (userID == data.racoon_id) {
                setIsMyTurn(true);
            }

            if (userID == data.squirrel_id) {
                setIsMyTurn(false);
            }
        }
    }

    async function submitEssay() {
        handleClose();
        setShow(true);
        const token = await user.getIdToken();
        await addEssayPara(token, cid, essay, title);
        setShow(false);
        history.push("/challenge");
    }

    function makeBadge(value) {
        if (value == "DRAFT") {
            return <Badge pill bg="secondary">{value}</Badge>
        } else if (value == "WAITING_MATCH") {
            if (isMyTurn) {
                return <Badge pill bg="success">Your Turn</Badge>
            } else {
                return <Badge pill bg="secondary">Awaiting Match</Badge>
            }
        } else if (value == "ONGOING") {
            if (isMyTurn) {
                return <Badge pill bg="success">Your Turn</Badge>
            } else {
                return <Badge pill bg="danger">Awaiting Turn</Badge>
            }
        }
    }

    let emptyChallengeData = [];
    emptyChallengeData.push(
        <tr>
            <br></br>
            <Spinner animation="border" variant="success" />
        </tr>
    )

    return (
        <div className="ms-5 me-5">
            <h1>Ongoing Challenge</h1>
            <Breadcrumb>
                <Breadcrumb.Item href="/challenge">Challenges</Breadcrumb.Item>
                <Breadcrumb.Item active>Challenge ID: {challengeData.racoon_id ? challengeData.challenge_id : 'Draft'}</Breadcrumb.Item>
            </Breadcrumb>

            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Squirrel Name</th>
                        <th>Racoon Name</th>
                        <th>Interests</th>
                        <th>Rounds</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {!challengeData.challenge_id ? emptyChallengeData
                    : <tbody>
                        <tr>
                            <td>{challengeData.challenge_id}</td>
                            <td>{challengeData.title}</td>
                            <td>{challengeData.squirrel_name}</td>
                            <td>{challengeData.racoon_name}</td>
                            <td>
                                <Badge pill bg="warning" className="black-text">{challengeData.interest}</Badge>
                            </td>
                            <td>
                                {challengeData.essay_paras.length}/{challengeData.num_of_total_turns}
                            </td>
                            <td>
                                {makeBadge(challengeData.status_of_challenge)}
                            </td>
                        </tr>
                    </tbody>
                }

            </Table>

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                {isMyTurn ? <FormControl
                    placeholder={challengeData.title}
                    onChange={(e) => setTitle(e.target.value)} />
                    : <FormControl
                        placeholder={challengeData.title}
                        onChange={(e) => setTitle(e.target.value)} disabled />}
            </InputGroup>

            <Card>
                <Card.Header>Story thus far...</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {essayThusFar.length == 0 ? <Spinner animation="border" variant="success" /> : essayThusFar}
                    </Card.Text>
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-center">
                <div className="challenge-nut">
                    <Card style={{ width: '60vw', height: '100%' }}>
                        <Card.Header>Today's Prompt</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Here are your word prompts. Use the words below to earn nuts!
                                <br></br>
                                {words.length == 0 && <Spinner animation="border" variant="success" />}
                                {word1Used ? <Badge pill bg="success" className="white-text me-3">{words[0]}</Badge> : <Badge pill bg="warning" className="black-text me-3">{words[0]}</Badge>}
                                {word2Used ? <Badge pill bg="success" className="white-text me-3">{words[1]}</Badge> : <Badge pill bg="warning" className="black-text me-3">{words[1]}</Badge>}
                                {word3Used ? <Badge pill bg="success" className="white-text me-3">{words[2]}</Badge> : <Badge pill bg="warning" className="black-text me-3">{words[2]}</Badge>}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="challenge-nut">
                    <Card style={{ width: '40vw', height: '100%' }}>
                        <Card.Header>Round Statistics</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {countExceeded ? <span className="red-text">Character Count: {wordCount}/{challengeData.word_limit_per_turn}</span> : <span className="green-text">Character Count: {wordCount}/{challengeData.word_limit_per_turn}</span>}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="challenge-nut">
                    <Card style={{ width: '100%', height: '100%' }}>
                        <Card.Header>Nuts Earned</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <div className="d-flex justify-content-center">
                                    <h1>{nutCount}</h1>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

            </div>

            <InputGroup className="mb-3 mt-3">
                {isMyTurn ? <textarea style={{ width: '100%', minHeight: '30vh' }}
                    placeholder=" Input your story here... "
                    onKeyUp={handleWordCount} />
                    : <textarea style={{ width: '100%', minHeight: '30vh' }}
                        placeholder=" It is currently not your turn... "
                        disabled />}

                <div className="d-flex flex-row-reverse">
                    {isMyTurn && <Button variant="dark" size="sm" className="primary-color" onClick={handleShow}>Submit</Button>}
                </div>
            </InputGroup>

            <Modal show={showSuccessModal} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to submit?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You're good to go!
                    <br></br>
                    <br></br>
                    Nuts Earned: {nutCount}
                    <br></br>
                    Words Used: {word1Used && words[0]} {word2Used && words[1]} {word3Used && words[2]}
                    <br></br>
                    Great Job!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitEssay}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFailureModal} onHide={handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Oops!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have exceeded the character count. Please keep to the word limit.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showZeroWordCountModal} onHide={handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Oops!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You cannot submit an essay with 0 character count. Please type your essay.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Body><Spinner animation="border" variant="success"/></Modal.Body>
            </Modal>

        </div>
    )
}
