import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function HNavbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-white py-1 border-bottom border-2"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            alt=""
            src="/HanielLogo.svg"
            height="50"
            className="d-inline-block align-top"
          />
          {""}
          <p className="mt-3 ms-2">Haniel</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/chi-siamo">
              Chi siamo
            </Nav.Link>
            <Nav.Link>Servizi offerti</Nav.Link>
            <Nav.Link as={Link} to="/contatti">
              Contatti
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to={isAuthenticated ? "/prenota" : "/login"}>
              Prenota
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HNavbar;
