import { Container, Navbar, Nav } from "react-bootstrap";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Navigation() {
  const [user] = useAuthState(auth);

  return (
    <Navbar variant="dark" className="primary-color">
      <Container fluid>
        <Navbar.Brand href="/">WordTree</Navbar.Brand>
        {user && (
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/challenge">Challenges</Nav.Link>
            <Nav.Link href="/community">TreeHouse</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
