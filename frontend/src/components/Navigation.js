import {Container, Navbar, Nav} from 'react-bootstrap'

export default function Navigation() {
  return (
    <Navbar bg='light' variant='light'>
      <Container>
        <Navbar.Brand href='/'>WordTree</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
