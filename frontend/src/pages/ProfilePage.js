import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getUserProfile } from "../utils/Api";

import { auth } from "../firebase";

import ProfileView from "../components/ProfileView";
import EditProfileView from "../components/EditProfileView";

function ProfilePage() {
  const [user] = useAuthState(auth);
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
  }

  function disableEdit() {
    setEditProfile(false);
  }

  function renderMainContents() {
    if (editProfile && !viewNut) {
      // Edit Profile
      if (user && userProfile) { 
          return (
          <EditProfileView userProfile={userProfile} user={user} interests={userProfile.interest} />
        );
      }
    }
    if (!editProfile && !viewNut) {
      // Normal Profile
      if (user && userProfile) {
        console.log(userProfile);
      return (
        <ProfileView userProfile={userProfile} user={user} interests={userProfile.interest} />
      );
      }
    }
  }

  return (
    <div className="d-flex justify-content-center profile-container">
      <div className="d-flex flex-column align-items-center profile-menu ">
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
    </div>
  );
}

export default ProfilePage;
