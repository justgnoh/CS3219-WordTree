import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, InputGroup, FormControl, Breadcrumb, Modal } from 'react-bootstrap';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Challenge() {
    const [wordCount, setWordCount] = useState(0);
    const [countExceeded, setCountExceeded] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [essay, setEssay] = useState('');

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

    // TODO: Pull max word count from ENDPOINT
    const maxWordCount = 100;

    // TODO: Pull words from word service
    const word1 = "proactive";
    const word2 = "dilemma";
    const word3 = "destroy";
    const words = [word1, word2, word3];

    function handleClose() {
        setShowSuccessModal(false);
        setShowFailureModal(false);
        setShowZeroWordCountModal(false);
    }

    function handleShow() {
        if (wordCount >= maxWordCount) {
            setShowFailureModal(true);
        } 
        
        if (wordCount === 0) {
            setShowZeroWordCountModal(true);
        }
        else {
            setShowSuccessModal(true);
        }
    }

    function handleWordCount(e) {
        e.preventDefault();
        console.log(e.target.value);
        const essayData = e.target.value;
        const wordCount = essayData.length

        setEssay(essayData);
        setWordCount(wordCount);
        checkWordUsage(essayData);
        checkNutsEarned(essayData);

        if (wordCount < maxWordCount) {
            setCountExceeded(false);
        }

        if (wordCount >= maxWordCount) {
            setCountExceeded(true);
        }
    }

    function checkWordUsage(d) {
        if (d.includes(word1)) {
            setWord1Used(true);
        }
        if (d.includes(word2)) {
            setWord2Used(true);
        }
        if (d.includes(word3)) {
            setWord3Used(true);
        }

        if (!d.includes(word1)) {
            setWord1Used(false);
        }
        if (!d.includes(word2)) {
            setWord2Used(false);
        }
        if (!d.includes(word3)) {
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

    function submitEssay() {
        handleClose();
        // TODO: Submit essay;
        // /challenge/<:id>

        console.log(essay);
    }

    return (
        <div className="ms-5 me-5">
            <h1>Ongoing Challenge</h1>
            <Breadcrumb>
                <Breadcrumb.Item href="/challenge">Challenges</Breadcrumb.Item>
                <Breadcrumb.Item active>Arthur {user ? user.uid : ''}</Breadcrumb.Item>
            </Breadcrumb>

            <Table responsive>
                <thead>
                    <tr>
                        <th>Display</th>
                        <th>Username</th>
                        <th>Genres</th>
                        <th>Turns</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr onClick={() => console.log("clicked on row")}>
                        <td>dp</td>
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
                    </tr>
                </tbody>
            </Table>

            <Card>
                <Card.Header>Story thus far...</Card.Header>
                <Card.Body>
                    <Card.Text>
                        (GET ESSAY thus far from Essay Service)
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Card.Text>
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-center">
                <div className="challenge-nut">
                    <Card style={{ width: '60vw', height: '100%' }}>
                        <Card.Header>Today's Prompt</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                (GET WORDS from Essay Service)
                                <br></br>
                                {word1Used ? <Badge pill bg="success" className="black-text me-3">{word1}</Badge> : <Badge pill bg="warning" className="black-text me-3">{word1}</Badge>}
                                {word2Used ? <Badge pill bg="success" className="black-text me-3">{word2}</Badge> :<Badge pill bg="warning" className="black-text me-3">{word2}</Badge>}
                                {word3Used ? <Badge pill bg="success" className="black-text me-3">{word3}</Badge>: <Badge pill bg="warning" className="black-text me-3">{word3}</Badge>}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="challenge-nut">
                    <Card style={{ width: '40vw', height: '100%' }}>
                        <Card.Header>Round Statistics</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                (GET STATS from Challenge Service)
                                <br></br>
                                Time Left: 20h 31m left
                                <br></br>
                                {countExceeded ? <span className="red-text">Word Count: {wordCount}/{maxWordCount}</span> : <span className="green-text">Word Count: {wordCount}/{maxWordCount}</span>}
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
                <textarea style={{ width: '100%', minHeight: '30vh' }} placeholder="Input your story here..." onKeyUp={handleWordCount} />
                <div className="d-flex flex-row-reverse">
                    <Button variant="dark" size="sm" className="primary-color" onClick={handleShow}>Submit</Button>
                    {/* <Button variant="dark" size="sm" className="primary-color">Save as Draft</Button> */}
                </div>
            </InputGroup>

            <Modal show={showSuccessModal} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to submit?</Modal.Title>
                </Modal.Header>
                <Modal.Body>You're good to go!</Modal.Body>
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
                <Modal.Body>You have exceeded the word count. Please keep to the word limit.</Modal.Body>
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
                <Modal.Body>You cannot submit an essay with 0 word count. Please type your essay.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        
        </div>
    )
}
