import React, { useState } from 'react'
import { Breadcrumb, InputGroup, FormControl, ButtonGroup, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function CreateChallengePage() {
    const [user, loading, error] = useAuthState(auth);
    const [checked, setChecked] = useState(false);

    // Request Values
    const [turns, setTurns] = useState('');
    const [wordLimit, setWordLimit] = useState('');
    const [interests, setInterests] = useState([]);

    const turnRadio = [
        { name: '4 turns', value: '4' },
        { name: '6 turns', value: '6' },
    ];

    const wordLimitRadio = [
        { name: '300 words', value: '300' },
        { name: '500 words', value: '500' },
    ]

    const interestsRadio = [{ name: 'crime' }, { name: 'fantasy' }, { name: 'adventure' }, { name: 'horror' }];

    var request = {
        "uid": 'user.uid',
        "turns": turns,
        "wordLimit": wordLimit,
        "interests": interests
    }

    function handleSelect(e) {
        setChecked(e.currentTarget.checked);
        if (checked) {
            setTurns(e.target.value)
        };
        console.log(e);
        console.log(request);
    }

    // const handleChange = (val) => setValue(val);

    function handleInterests(val) {
        setInterests(val);
        console.log(val);
    }

    function handleChange(val) {
        setValue(val);
        console.log(val)
    }

    const [value, setValue] = useState([1, 3]);

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
                // value={user.uid}
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

            {/* TODO: Get Genres */}
            <ToggleButtonGroup className="mb-3" type="checkbox" value={interests} onChange={handleInterests} >
                {interestsRadio.map((item, idx) => (
                    <ToggleButton  className="black-text"id={idx} variant={'outline-warning'} value={item.name}>
                        {item.name}
                    </ToggleButton>
                )
                )}
            </ToggleButtonGroup>

            <div>
                <Button variant="dark" style={{minWidth:'100%'}} className="primary-color" onClick={() => console.log(request)}>Submit</Button>
            </div>


        </div>
    )
}
