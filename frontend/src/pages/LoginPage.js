import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, basicSignIn } from "../firebase.js";

import "./styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace("/");
    }
  });

  return (
    <div className="login">
      <div className="login__container white-text">
        <h1>Login</h1>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        
        <button
          className="login__btn"
          onClick={() => {
            if (email.trim().length === 0) {
              alert("Empty email field!");
            } else if (password.trim().length < 6) {
              alert("Password length is at least 6 characters!")
            } else {
              basicSignIn(email, password)};
            }
          }
        >
        Login
        </button>

        {/* Add other login modes here */}

        <div>
          Don't have an account? <Link to="/register" className="white-text">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
