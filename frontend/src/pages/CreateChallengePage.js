import React, { useState, useEffect } from 'react'
import { Breadcrumb, InputGroup, FormControl, Modal, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useHistory } from 'react-router';
import { createNewChallenge, getSystemInterests } from '../utils/Api';

export default function CreateChallengePage() {
    const [user] = useAuthState(auth);
    const history = useHistory();

    // Request Values
    const [turns, setTurns] = useState('');
    const [wordLimit, setWordLimit] = useState('');
    const [interests, setInterests] = useState('');
    const [interestsRadio, setInterestsRadio] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const turnRadio = [
        { name: '4 turns', value: '4' },
        { name: '6 turns', value: '6' },
    ];

    const wordLimitRadio = [
        { name: '1000 characters', value: '1000' },
        { name: '1500 characters', value: '1500' },
    ]

    useEffect(() => {
        getSystemInterests().then((resp) => {
            setInterestsRadio(resp.data);
        })
    }, []);

    async function createChallengeRequest() {
        var request = {
        "uid": user.uid,
        "turns": parseInt(turns),
        "wordLimit": parseInt(wordLimit),
        "interest": interests
        }

        if (request.uid != '' && (request.turns == "6" || request.turns == "4") &&
            (request.wordLimit == "1000" || request.wordLimit == "1500") && request.interest.length != 0) {
            const token = await user.getIdToken();
            await createNewChallenge(request, token);
            history.replace("/challenge");
        } else {
            setShow(true);
        }
    }

    return (
        <div className="ms-5 me-5">
            <h1>Create Challenge Request</h1>
            <Breadcrumb>
                <Breadcrumb.Item href="/challenge">Challenges</Breadcrumb.Item>
                <Breadcrumb.Item active>Create challenge request</Breadcrumb.Item>
            </Breadcrumb>

            <h3>Squirrel ID</h3>
            <InputGroup size="sm" className="mb-3" style={{ width: '100%' }}>
                <InputGroup.Text id="basic-addon1">id</InputGroup.Text>
                <FormControl
                    placeholder="Squirrel Id"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled
                />
            </InputGroup>

            <h3 className="mt-3">Select number of turns</h3>

            {turnRadio.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`turn-${idx}`}
                    type="radio"
                    variant={'outline-success'}
                    name="turn"
                    value={radio.value}
                    checked={turns === radio.value}
                    onChange={(e) => setTurns(e.currentTarget.value)}
                    className="me-3"
                >
                    {radio.name}
                </ToggleButton>
            ))}

            <h3 className="mt-3">Word Limit</h3>

            {wordLimitRadio.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`word-${idx}`}
                    type="radio"
                    variant={'outline-success'}
                    name="word"
                    value={radio.value}
                    checked={wordLimit === radio.value}
                    onChange={(e) => setWordLimit(e.currentTarget.value)}
                    className="me-3"
                >
                    {radio.name}
                </ToggleButton>
            ))}

            <h3 className="mt-3">Genre selection</h3>

            {interestsRadio.map((item, idx) => (
                <ToggleButton
                    key={idx}
                    id={`interests-${idx}`}
                    type="radio"
                    variant={'outline-warning'}
                    name="interests"
                    value={item.interest}
                    checked={interests === item.interest}
                    onChange={(e) => setInterests(e.currentTarget.value)}
                    className="me-3 black-text"
                >
                    {item.interest}
                </ToggleButton>
            ))}

            <div>
                <Button variant="dark" style={{ minWidth: '100%' }} className="primary-color mt-3" onClick={createChallengeRequest}>Submit</Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ooops!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please check if you have selected all required options.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
