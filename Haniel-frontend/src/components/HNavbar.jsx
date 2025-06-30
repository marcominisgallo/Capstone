import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function HNavbar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-white py-1 border-bottom border-2"
    >
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            alt=""
            src="/public/HanielLogo.svg"
            height="50"
            className="d-inline-block align-top"
          />
          {""}
          <p className="mt-3 ms-2">Haniel</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Chi siamo</Nav.Link>
            <Nav.Link href="#pricing">Servizi offerti</Nav.Link>
            <Nav.Link href="#">Contatti</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Prenota</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HNavbar;
