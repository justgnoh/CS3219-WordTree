import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getUserProfile } from "../utils/Api";

import { auth, logout } from "../firebase";

import NutView from "../components/NutView";
import ProfileView from "../components/ProfileView";

function ProfilePage() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const [editProfile, setEditProfile] = useState(false);
  const [viewNut, setViewNut] = useState(false);
  const [userProfile, setUserProfile] = useState({
    profile: {
      joined_datetime: '',
      user_name: '',
    }
  });

  useEffect(() => {
    if (!user) {
      history.replace("/");
    } else {
      pullUserProfile();
    }

  }, [user, history]);

  async function pullUserProfile() {
    const token = await user.getIdToken(true);
    const response = await getUserProfile(token);
    setUserProfile(response.data);
    console.log(response.data);
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
      // if (user) {
      //   return (
      //     <EditProfileView userProfile={userProfile} user={user} />
      //   );
      // }
    }
    if (!editProfile && !viewNut) {
      // Normal Profile
      if (user && userProfile) {
      return (
        <ProfileView userProfile={userProfile} user={user} interests={userProfile.interest} />
      );
      }
    }
    if (viewNut) {
      // Nut View
      return (
        <div className="d-flex  align-content-center justify-content-center profile-contents-container borderGrey">
          <NutView essayNut={10} communityChallengeNut={15} communityEssayNut={15} />
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
        </div>
      </div>
      {renderMainContents()}
      {/* TODO: Nut view */}
    </div>
  );
}

export default ProfilePage;
