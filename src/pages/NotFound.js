import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center my-5">
        <Col md={6}>
          <h1 className="display-1 mb-4">404</h1>
          <h2 className="mb-4">Página no encontrada</h2>
          <p className="lead mb-5">
            Lo sentimos, la página que estás buscando no existe.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg">
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;