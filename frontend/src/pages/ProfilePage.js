import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getUserProfile, getAllNuts } from "../utils/Api";

import { auth, logout } from "../firebase";

import NutView from "../components/NutView";

function ProfilePage() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const [editProfile, setEditProfile] = useState(false);
  const [viewNut, setViewNut] = useState(false);

  // TODO: API CALL to User Service
  // const userProfile = getUserProfile(user.uid);

  // TODO: API CALL to NUT SERVICE
  // const userNuts = getAllNuts(user.uid);

  useEffect(() => {
    if (!user) {
      history.replace("/");
    } else {
      pullUserProfile();
    }
    
  }, [user, history]);

  async function pullUserProfile() {
    const token = await user.getIdToken(true);
    const userProfile = await getUserProfile(token);
    console.log(userProfile);
  }

  function enableEdit() {
    setEditProfile(true);
    setViewNut(false);
  }

  function disableEdit() {
    setEditProfile(false);
    setViewNut(false);
  }

  function enableNut() {
    setEditProfile(false);
    setViewNut(true);
  }

  function renderMainContents() {
    if (editProfile && !viewNut) {
      // Edit Profile
      return (
        <div className="d-flex flex-column profile-contents-container borderGrey">
          
        </div>
      );
    }
    if (!editProfile && !viewNut) {
      // Normal Profile
      return (
        <div className="d-flex flex-column profile-contents-container">
            <div>some image</div>
          <Container className=" profile-contents">
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                  <Row>First Name</Row>
                  <Row>John</Row>
                  {/* <Row>userProfile.profile.name</Row> */}
              </Col>
              <Col xs lg="2">
                <Row>Age:</Row>
                <Row>9</Row>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Row>Last Name:</Row>
                <Row>Tan</Row>
              </Col>
              <Col xs lg="2">
                <Row>Date Joined:</Row>
                <Row>21-Oct-2021</Row>
              </Col>
            </Row>
          </Container>
          <div className="borderGrey">
            Interests:
            
            {/* TODO: Map user's interest */}
            {/* userProfile.profile.interests.map((interest) => {
              <Badge pill bg="warning">interest</Badge>
            }); */}

            <Badge pill bg="warning">
              Horror
            </Badge>
            <Badge pill bg="warning">
              Sci-Fi
            </Badge>
          </div>
        </div>
      );
    }
    if (viewNut) {
      // Nut View
      return (
        <div className="d-flex  align-content-center justify-content-center profile-contents-container borderGrey">
          <NutView essayNut={10} communityChallengeNut={15} communityEssayNut={15} />
          {/* <NutView essayNut={userNuts[0]} communityChallengeNut={userNuts[1]} communityEssayNut={userNuts[2]} /> */}
        </div>
      );
    }
  }

  // <ButtonGroup vertical className="profile-menu-nav gap-3">

  return (
    <div className="d-flex justify-content-center profile-container borderGrey ">
      <div className="d-flex flex-column align-items-center profile-menu borderGrey ">
        <div className="d-flex flex-column profile-menu-nav gap-3">
          <Button
            variant="dark"
            className="primary-color"
            onClick={disableEdit}
          >
            My Profile
          </Button>
          <Button variant="dark" className="primary-color" onClick={enableEdit}>
            Edit Profile
          </Button>
          <Button variant="dark" className="primary-color" onClick={enableNut}>
            Nuts
          </Button>
        </div>
      </div>
      {renderMainContents()}
      {/* TODO: Nut view */}
    </div>
  );
}

export default ProfilePage;
