import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router";

import logo from "../assets/wordtree_logo.jpg";

export default function HomePage() {
  const [user] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace("/profile");
    }
  }, [user, history]);

  return (
    <Container fluid>
      {user ? () => {history.push("/profile")}
        : (
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
