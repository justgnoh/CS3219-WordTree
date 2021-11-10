import React, { useState, useEffect } from 'react'
import { Container, Col, Row, FormControl, Button, Badge } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { updateUserProfile, getAllNuts } from '../utils/Api';

import NutView from './NutView';

export default function ProfileView(props) {
    const { userProfile, user, interests } = props;
    const history = useHistory();
    const [editName, setEditName] = useState('');
    const [editDOB, setEditDOB] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDOB, setCurrentDOB] = useState('');
    const [joinDateTime, setJoinDateTime] = useState(' ');
    const [displayUserInterests, setDisplayUserInterests] = useState('');
    const [allNuts, setAllNuts] = useState({
        communityChallengeNut: 0,
        communityEssayNut: 0,
        essayNut: 0,
        totalNut: 0
    });

    useEffect(() => {
        if (userProfile && interests && user) {
            setCurrentName(userProfile.profile.user_name);
            setCurrentDOB(userProfile.profile.date_of_birth);
            setJoinDateTime(userProfile.profile.joined_datetime);

            setEditName(userProfile.profile.user_name);
            setEditDOB(userProfile.profile.date_of_birth);

            let interestBadge = [];
            for (let i = 0; i < interests.length; i++) {
                interestBadge.push(
                    <Row className="justify-content-md-center mt-3">
                        <Badge pill bg="warning" style={{ width: '7vw' }}>{interests[i].interest}</Badge>
                    </Row>
                )
            }
            interestBadge.push(
                <Row className="justify-content-md-center mt-3">
                    <Badge pill bg="secondary" style={{ width: '7vw', cursor: 'pointer' }} onClick={() => history.push("interests")}>+Edit</Badge>
                </Row>
            )

            setDisplayUserInterests(interestBadge);

            getAllNuts(user.uid)
                .then((resp) => { console.log(resp.data); setAllNuts(resp.data); });
        }
    }, [user, userProfile, interests]);

    async function editProfile() {
        console.log(editName);
        console.log(editDOB.slice(0, 10));
        const editData = {
            "uid": user.uid,
            "name": editName,
            "dob": editDOB.slice(0, 10)
        };

        const token = await user.getIdToken();
        console.log(token);
        await updateUserProfile(token, editData);
        history.go(0);
    }

    return (
        <div className="d-flex flex-column profile-contents-container">
            <Container className=" profile-contents">
                <Row className="justify-content-md-center">
                    <Col xs lg="2" className="me-5">
                        <Row className="justify-content-md-center">Name:</Row>
                        {true ? <Row className="justify-content-md-center"><FormControl size="sm"
                            placeholder={userProfile.profile.user_name}
                            onChange={(e) => setEditName(e.target.value)}
                        /></Row> :
                            <Row className="justify-content-md-center">{currentName}</Row>}

                    </Col>
                    <Col xs lg="2">
                        <Row className="justify-content-md-center">Date of birth:</Row>
                        {true ? <Row className="justify-content-md-center">
                            <FormControl size="sm"
                                placeholder="MM/DD/YYYY"
                                onChange={(e) => setEditDOB(e.target.value)}
                            /> </Row>
                            : <Row className="justify-content-md-center">{currentDOB}</Row>}
                    </Col>
                </Row>

                <Row className="justify-content-md-center mt-3">
                    Date Joined: {joinDateTime.slice(0, 10)}
                </Row>

                <Row className="justify-content-md-center mt-3">
                    Interests: {displayUserInterests}
                </Row>
            </Container>

            <div className="d-flex  align-content-center justify-content-center profile-contents-container mt-3">
                <NutView totalNut={allNuts.totalNut} essayNut={allNuts.essayNut} communityChallengeNut={allNuts.communityChallengeNut} communityEssayNut={allNuts.communityEssayNut} />
            </div>

            {(currentName != editName || currentDOB != editDOB) && <Button variant="dark" size="sm" className="primary-color" onClick={editProfile}>Confirm</Button>}
        </div>
    )
}
