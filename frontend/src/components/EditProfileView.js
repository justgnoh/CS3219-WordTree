import React, { useState, useEffect } from 'react'
import { Container, Col, Row, FormControl, Button } from 'react-bootstrap';
import NutView from './NutView';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { updateUserProfile } from '../utils/Api';

export default function ProfileView(props) {
    const { userProfile } = props;
    const [user] = useAuthState(auth);
    const [editName, setEditName] = useState('');
    const [editDOB, setEditDOB] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDOB, setCurrentDOB] = useState('');

    useEffect(() => {
        if (user && userProfile) {
            setCurrentName(userProfile.profile.user_name);
            setCurrentDOB(userProfile.profile.date_of_birth);

            setEditName(userProfile.profile.user_name);
            setEditDOB(userProfile.profile.date_of_birth);
        }
    }, []);

    useEffect(() => {
        if (userProfile && interests && user) {
            setCurrentName(userProfile.profile.user_name);
            setCurrentDOB(userProfile.profile.date_of_birth);

            let interestBadge = [];
            for (let i = 0; i < interests.length; i++) {
                interestBadge.push(
                    <Row className="justify-content-md-center mt-3">
                            <Badge pill bg="warning" style={{width: '5vw'}}>{interests[i].interest}</Badge>
                    </Row>
                )
            }

            setDisplayUserInterests(interestBadge);

            getAllNuts(user.uid)
                .then((resp) => {console.log(resp.data); setAllNuts(resp.data);})
            }
    }, [user, userProfile, interests]);

    let displayUserInterests = [];
        for (let i = 0; i < userProfile.profile.interests.length; i++) {
            displayUserInterests.push(<Badge pill bg="warning">userProfile.profile.interests[i]</Badge>);
        }

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
    }

    return (
        <div className="d-flex flex-column profile-contents-container">
            <Container className=" profile-contents">
                <Row className="justify-content-md-center">
                    <Col xs lg="2" className="me-5">
                        <Row className="justify-content-md-center">Name:</Row>
                        { ? <Row className="justify-content-md-center"><FormControl size="sm"
                            placeholder={userProfile.profile.user_name}
                            onChange={(e) => setEditName(e.target.value)}
                        /></Row> :
                            <Row className="justify-content-md-center">{currentName}</Row>}

                    </Col>
                    <Col xs lg="2">
                        <Row className="justify-content-md-center">Date of birth:</Row>
                        { ? <Row className="justify-content-md-center">
                            <FormControl size="sm"
                                placeholder="MM/DD/YYYY"
                                onChange={(e) => setEditDOB(e.target.value)}
                            /> </Row>
                            : <Row className="justify-content-md-center">{currentDOB}</Row>}
                    </Col>
                </Row>

                <Row className="justify-content-md-center mt-3">
                    Date Joined: {userProfile.profile.joined_datetime}
                </Row>

                <Row className="justify-content-md-center mt-3">
                    Interests: {(userProfile.interest.length == 0) && displayUserInterests}
                </Row>
            </Container>

            <div className="d-flex  align-content-center justify-content-center profile-contents-container mt-3">
                <NutView totalNut={userProfile.profile.total_nut} essayNut={10} communityChallengeNut={15} communityEssayNut={15} />
            </div>

            { && <Button variant="dark" size="sm" className="primary-color" onClick={editProfile}>Confirm</Button>}
        </div>
    )
}
