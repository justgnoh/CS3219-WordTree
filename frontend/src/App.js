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
import ChallengePage from "./pages/ChallengePage";
import Challenge from "./pages/Challenge";
import CommunityPage from "./pages/CommunityPage";
import InterestsPage from "./pages/InterestsPage";
import CreateChallengePage from "./pages/CreateChallengePage";
import ViewRequestsPage from "./pages/ViewRequestsPage";
import ViewCompletedChallenge from "./pages/ViewCompletedChallenge";

import SocketPage from "./pages/SocketPage"; //socket

function App() {

  return (
    <Router>
      <Navigation/>
      <div>
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
          <Route exact path="/interests">
            <InterestsPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/community">
            <CommunityPage />
          </Route>
          <Route exact path="/challenge">
            <ChallengePage />
          </Route>
          <Route exact path="/challenge/create">
            <CreateChallengePage/>
          </Route>
          <Route exact path="/challenge/view">
            <ViewRequestsPage/>
          </Route>
          
          <Route path="/challenge/:cid" children={<Challenge/>} />
          <Route path="/community/:cid" children={<ViewCompletedChallenge/>} />

          <Route exact path="/socket">
            <SocketPage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


