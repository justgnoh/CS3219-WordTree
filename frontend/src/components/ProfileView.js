import React, { useState, useEffect } from 'react'
import { Container, Col, Row, FormControl, Button, Badge } from 'react-bootstrap';
import NutView from './NutView';
import { getAllNuts } from '../utils/Api';

export default function ProfileView(props) {
    const { userProfile, user, interests } = props;
    const [currentName, setCurrentName] = useState(' ');
    const [currentDOB, setCurrentDOB] = useState(' ');
    const [joinDateTime, setJoinDateTime] = useState(' ');
    const [allNuts, setAllNuts] = useState({
        communityChallengeNut: 0,
        communityEssayNut: 0,
        essayNut: 0,
        totalNut: 0
    });
    const [displayUserInterests, setDisplayUserInterests] = useState([]);
    

    useEffect(() => {
        if (userProfile && interests && user) {
            console.log(userProfile);
            setCurrentName(userProfile.profile.user_name);
            setCurrentDOB(userProfile.profile.date_of_birth);
            setJoinDateTime(userProfile.profile.joined_datetime);

            let interestBadge = [];
            for (let i = 0; i < interests.length; i++) {
                interestBadge.push(
                    <Row className="justify-content-md-center mt-3">
                            <Badge pill bg="warning" style={{width: '7vw'}}>{interests[i].interest}</Badge>
                    </Row>
                )
            }

            setDisplayUserInterests(interestBadge);

            getAllNuts(user.uid)
                .then((resp) => {console.log(resp.data); setAllNuts(resp.data);})
            }
    }, [user, userProfile, interests]);

    return (
        <div className="d-flex flex-column profile-contents-container">
            <Container className=" profile-contents">
                <Row className="justify-content-md-center">
                    <Col xs lg="2" className="me-5">
                        <Row className="justify-content-md-center">Name:</Row>
                        <Row className="justify-content-md-center">{currentName}</Row>
                    </Col>
                    <Col xs lg="2">
                        <Row className="justify-content-md-center">Date of birth:</Row>
                        <Row className="justify-content-md-center">{currentDOB.slice(0,10)}</Row>
                    </Col>
                </Row>

                <Row className="justify-content-md-center mt-3">
                    Date Joined: {joinDateTime.slice(0,10)}
                </Row>

                <Row className="justify-content-md-center mt-3">
                    Interests: {displayUserInterests}
                </Row>
               
            </Container>

            <div className="d-flex  align-content-center justify-content-center profile-contents-container mt-3">
                <NutView totalNut={allNuts.totalNut} essayNut={allNuts.essayNut} communityChallengeNut={allNuts.communityChallengeNut} communityEssayNut={allNuts.communityEssayNut} />
            </div>
        </div>  
    )
}
