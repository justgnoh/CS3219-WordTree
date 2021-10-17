import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";
import { useHistory } from "react-router";

import logo from "../assets/logo512.png";

export default function HomePage() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.replace("/");
    }
    // fetchUserName();
  }, [user]);

  return (
    <Container fluid>
      {user ? (
        <div>
          <div>Logged in as {user.email}</div>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-around customHeight">
          <img className="logo" src={logo} alt="word-tree-logo" />
          <Button
            variant="light"
            className="primary-color white-text"
            onClick={() => history.replace("/login")}
          >
            Login
          </Button>
          <Button
            variant="light white-text"
            className="primary-color"
            onClick={() => history.replace("/register")}
          >
            Register
          </Button>
        </div>
      )}
    </Container>
  );
}
