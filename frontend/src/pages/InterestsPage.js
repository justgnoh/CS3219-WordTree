import React, { useState, useEffect } from 'react'
import { ToggleButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { getSystemInterests, updateUserInterests } from '../utils/Api';
import { useHistory } from "react-router-dom";

export default function InterestsPage() {
    const [user, loading, error] = useAuthState(auth);
    const [interests, setInterests] = useState([]);
    const [interestsRadio, setInterestsRadio] = useState([]);
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        getSystemInterests().then((resp) => {
            setInterestsRadio(resp.data);
        })
    }, []);

    function handleInterests(val) {
        setInterests(val);
    }

    async function addInterests() {
        console.log(interests);
        console.log("All Good")
        const userToken = await user.getIdToken(true);
        await updateUserInterests(userToken, interests);
        history.push("/profile");
        
        // if (interests.length != 0) {
        //     // TODO: Post
        //     console.log("All Good")
        //     const userToken = await user.getIdToken(true);
        //     await updateUserInterests(userToken, interests);
        //     history.push("/profile");
        // } else {
        //     setShow(true);
        // }
    }

    return (
        <div className="ms-5 me-5">
            <h1>Select your interests</h1>
            <p>Selecting your interests will show others what type of essays you are interested in!</p>

            {/* Selecting Interests from an existing set */}
            <ToggleButtonGroup className="mb-3" type="checkbox" value={interests} onChange={handleInterests} >
                {interestsRadio.map((item, idx) => (
                    <ToggleButton className="black-text" id={idx} variant={'outline-warning'} value={item.interest}>
                        {item.interest}
                    </ToggleButton>
                )
                )}
            </ToggleButtonGroup>

            <div>
                <Button variant="dark" style={{ minWidth: '100%' }} className="primary-color" onClick={addInterests}>Submit</Button>
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
