import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../firebase.js";

import "./styles/RegisterPage.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    // TODO: Add post Auth Page
    if (user) {
        history.replace("/profile");
        console.log(user);
    }
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container white-text">
        <h1>Registration</h1>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="date"
          className="register__textBox"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Date Of Birth"
        />

        <button className="register__btn" onClick={()=>register}>
          Register
        </button>

        <div>
          Already have an account? <Link to="/login" className="white-text">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
