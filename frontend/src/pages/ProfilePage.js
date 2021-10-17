import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";

import { auth, db, logout } from "../firebase";

function ProfilePage() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.replace("/");
    }
    // fetchUserName();
  }, [user]);

  return (
    <div>
      <div>
        {user ? (
          <div>
            <div>Logged in as {user.email}</div>
            <button className="dashboard__btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div>Not logged in</div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
