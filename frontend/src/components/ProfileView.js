import React, { useState, useEffect } from 'react'
import { Container, Col, Row, FormControl, Button, Badge } from 'react-bootstrap';
import NutView from './NutView';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { getAllNuts } from '../utils/Api';

export default function ProfileView(props) {
    const { userProfile, user } = props;
    // const [user, loading, error] = useAuthState(auth);
    const [currentName, setCurrentName] = useState('');
    const [currentDOB, setCurrentDOB] = useState('');
    const [interests, setInterests] = useState(['none','none1']);
    const [allNuts, setAllNuts] = useState([0,0,0])

    useEffect(() => {
        if (userProfile) {
            setCurrentName(userProfile.profile.user_name);
            setCurrentDOB(userProfile.profile.date_of_birth);
            setInterests(userProfile.interest);

            user.getIdToken().then((token) => {
                getAllNuts(token)
                .then((resp) => setAllNuts(resp.data));
            })
        }
    }, [userProfile]);
    
    if (!userProfile) {
        // let displayUserInterests = [];
        // for (let i = 0; i < interests.length; i++) {
        //     displayUserInterests.push(
        //         <Row className="justify-content-md-center mt-3">
        //                 <Badge pill bg="warning" style={{width: '5vw'}}>{interests[i].interest}</Badge>
        //         </Row>
        //     )
        // }
        // setInterests(displayUserInterests)    
    }

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
                        <Row className="justify-content-md-center">{currentDOB}</Row>
                    </Col>
                </Row>

                <Row className="justify-content-md-center mt-3">
                    Date Joined: {userProfile.profile.joined_datetime}
                </Row>

                <Row className="justify-content-md-center mt-3">
                    Interests:
                </Row>
                <Row className="justify-content-md-center mt-3">
                    {/* Interests: {displayUserInterests} */}
                    <Badge pill bg="warning" style={{width: '5vw'}}>hi</Badge>
                </Row>
                <Row className="justify-content-md-center mt-3">
                    {/* Interests: {displayUserInterests} */}
                    <Badge pill bg="warning" style={{width: '5vw'}}>hi</Badge>
                </Row>
                <Row className="justify-content-md-center mt-3">
                    {/* Interests: {displayUserInterests} */}
                    <Badge pill bg="warning" style={{width: '5vw'}}>hi</Badge>
                </Row>
                
            </Container>

            <div className="d-flex  align-content-center justify-content-center profile-contents-container mt-3">
                <NutView totalNut={userProfile.profile.total_nut} essayNut={allNuts[0].nut} communityChallengeNut={allNuts[1].nut} communityEssayNut={allNuts[2].nut} />
            </div>
        </div>
    )
}
