import { Container, Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleNavbar, closeNavbar } from "../redux/navbarSlice";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
function HNavbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Stato di autenticazione
  const user = useSelector((state) => state.auth.user); // Recupera i dati dell'utente autenticato
  const expanded = useSelector((state) => state.navbar.expanded); // Stato della navbar
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-white py-1 border-bottom border-2"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
          onClick={() => dispatch(closeNavbar())}
        >
          <img
            alt="Logo Haniel"
            src="/capstone/HanielLogo.svg"
            height="50"
            className="d-inline-block align-top"
          />
          <p className="mt-3 ms-2">Haniel</p>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => dispatch(toggleNavbar())}
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
            <Nav.Link
              as={Link}
              to="/servizi-offerti"
              onClick={() => dispatch(closeNavbar())}
            >
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
            {isAuthenticated ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/prenota"
                  onClick={() => dispatch(closeNavbar())}
                >
                  Prenota
                </Nav.Link>
                <Dropdown align="end" className="ms-3">
                  <Dropdown.Toggle
                    variant="outline-success"
                    id="dropdown-basic"
                    className="custom-dropdown-toggle" // Classe personalizzata
                  >
                    {user?.nome || "Account"} {/* Mostra il nome dell'utente */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                onClick={() => dispatch(closeNavbar())}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HNavbar;
