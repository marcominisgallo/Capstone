import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleNavbar, closeNavbar } from "../redux/navbarSlice";

function HNavbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Stato di autenticazione
  const expanded = useSelector((state) => state.navbar.expanded); // Stato della navbar
  const dispatch = useDispatch();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-white py-1 border-bottom border-2"
      expanded={expanded} // Controllo della visibilità della nav
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
          onClick={() => dispatch(closeNavbar())}
        >
          <img
            alt=""
            src="/HanielLogo.svg"
            height="50"
            className="d-inline-block align-top"
          />
          {""}
          <p className="mt-3 ms-2">Haniel</p>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => dispatch(toggleNavbar())} // apri e chiudi automatico
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/chi-siamo"
              onClick={() => dispatch(closeNavbar())}
            >
              Chi siamo
            </Nav.Link>
            <Nav.Link onClick={() => dispatch(closeNavbar())}>
              Servizi offerti
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contatti"
              onClick={() => dispatch(closeNavbar())}
            >
              Contatti
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              as={Link}
              to={isAuthenticated ? "/prenota" : "/login"}
              onClick={() => dispatch(closeNavbar())}
            >
              {isAuthenticated ? "Prenota" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HNavbar;
