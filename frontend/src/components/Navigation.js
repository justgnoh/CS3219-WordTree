import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";
import { useHistory } from "react-router";

export default function Navigation() {
  const [user] = useAuthState(auth);
  const history = useHistory();

  return (
    <Navbar variant="dark" className="primary-color">
      <Container fluid>
        <Navbar.Brand href="/">WordTree</Navbar.Brand>
        {user && (
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/challenge">Challenges</Nav.Link>
            <Nav.Link href="/community">TreeHouse</Nav.Link>
            <Button variant="light" className="ml-auto" onClick={()=> {logout(); history.replace('/');
            }}>Logout</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
