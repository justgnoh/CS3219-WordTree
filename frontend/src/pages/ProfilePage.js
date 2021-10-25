import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";

import { auth, logout } from "../firebase";

function ProfilePage() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const [editProfile, setEditProfile] = useState(false);
  const [viewNut, setViewNut] = useState(false);

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
          <Container className="borderGrey profile-contents">
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                  <Row>First Name:</Row>
                  <Row>John</Row>
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
        <div className="d-flex flex-column profile-contents-container borderGrey">
          Nutview
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
