import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="primary" className="me-2" as={Link} to="/add">
              Add Product
            </Button>
            <Button variant="danger"  className="me-2" as={Link} to="/delete">
              Delete Product
            </Button>
            <Button variant="danger" className="me-2" as={Link} to="/adminorder">
              View Orders
            </Button>
            <Button variant="primary" className="me-2" as={Link} to="/">
              Go to The WebSite
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
