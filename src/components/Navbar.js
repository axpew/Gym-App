import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">GymManager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/gimnasios">Gimnasios</Nav.Link>
            <Nav.Link as={Link} to="/personas">Personas</Nav.Link>
            <NavDropdown title="Entrenamiento" id="training-dropdown">
              <NavDropdown.Item as={Link} to="/ejercicios">Ejercicios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registros">Registros</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Seguimiento" id="tracking-dropdown">
              <NavDropdown.Item as={Link} to="/notas-personas">Notas de Personas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/diario-gimnasio">Diario del Gimnasio</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;