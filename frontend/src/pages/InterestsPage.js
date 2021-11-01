import React, {useState} from 'react'
import { ToggleButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap'
import { getSystemInterests } from '../utils/Api';

export default function InterestsPage() {
    const [interests, setInterests] = useState([]);
    const interestsRadio = [{ interests: 'crime' }, { interests: 'fantasy' }, { interests: 'adventure' }, { interests: 'horror' }];
    // REPLACE W THIS
    // const interestsRadio = getSystemInterests();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    function handleInterests(val) {
        setInterests(val);
    }

    function addInterests() {
        console.log(interests);
        if (interests.length != 0) {
            // TODO: Post
            console.log("All Good")
        } else {
            setShow(true);
        }
    }


    return (
        <div className="ms-5 me-5">
            <h1>Select your interests</h1>
            <p>Selecting your interests will show others what type of essays you are interested in!</p>

            {/* Selecting Interests from an existing set */}
            <ToggleButtonGroup className="mb-3" type="checkbox" value={interests} onChange={handleInterests} >
                {interestsRadio.map((item, idx) => (
                    <ToggleButton className="black-text" id={idx} variant={'outline-warning'} value={item.name}>
                        {item.interests}
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
                    Please check if you have selected all required option.
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
