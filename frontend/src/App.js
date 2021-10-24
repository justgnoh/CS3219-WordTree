import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <Router>
      <Navigation/>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">HomePage</Link>
            </li>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
            <li>
              <Link to="/register">Register Page</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/community">
            <Community />
          </Route>
          <Route exact path="/challenge">
            <Challenge />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Challenge() {
  return <h2>This is the Challenge page</h2>;
}

function Community() {
  return <h2>Welcome to the Treehouse! Come hangout!</h2>;
}

export default App;


