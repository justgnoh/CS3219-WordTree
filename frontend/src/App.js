import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './pages/LoginPage';

import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Welcome Back User!</Link>
            </li>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
            <li>
              <Link to="/register">Register Page</Link>
            </li>
            <li>
              <Link to="/challenge">Challenge Page</Link>
            </li>
            <li>
              <Link to="/community">Community Page</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/community">
            <Community />
          </Route>
          <Route path="/challenge">
            <Challenge />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

// TODO: Shift these into pages
function Profile() {
  return <h2>This is the users profile, concatenate the url with their pid</h2>;
}

// function Login() {
//   return <h2>This is the login page, Username, Password</h2>;
// }

function Register() {
  return <h2>This is the register page, Username, Password + Other basic details</h2>;
}

function Challenge() {
  return <h2>This is the Challenge page</h2>;
}

function Community() {
  return <h2>Welcome to the Treehouse! Come hangout!</h2>;
}