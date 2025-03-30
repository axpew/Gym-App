import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const Home = () => {
  return (
    <>
      <div className="home-banner text-center">
        <Container className="py-5">
          <h1 className="display-4 fw-bold mb-4">GymManager</h1>
          <p className="lead mb-4">
            La manera más eficiente de administrar tus gimnasios, 
            entrenadores y clientes en un solo lugar.
          </p>
          <div className="d-flex gap-3 justify-content-center mt-4">
            <Button as={Link} to="/gimnasios" variant="light" size="lg" className="fw-bold">
              <i className="bi bi-building me-2"></i>Gestionar Gimnasios
            </Button>
            <Button as={Link} to="/personas" variant="outline-light" size="lg" className="fw-bold">
              <i className="bi bi-people me-2"></i>Gestionar Personas
            </Button>
          </div>
        </Container>
      </div>
      
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-5">Tu Panel de Control</h2>
        <Dashboard />
        
        <Row className="mt-5 py-5">
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 animated-card">
              <Card.Body className="d-flex flex-column">
                <div className="text-center mb-4">
                  <i className="bi bi-building text-primary" style={{ fontSize: "3rem" }}></i>
                </div>
                <Card.Title className="fw-bold">Gestión de Gimnasios</Card.Title>
                <Card.Text className="flex-grow-1">
                  Administra todos tus locales en un solo lugar. Agrega información detallada, imágenes y más.
                </Card.Text>
                <Button as={Link} to="/gimnasios" variant="outline-primary" className="w-100">
                  Ir a Gimnasios
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 animated-card" style={{ animationDelay: "0.1s" }}>
              <Card.Body className="d-flex flex-column">
                <div className="text-center mb-4">
                  <i className="bi bi-people text-success" style={{ fontSize: "3rem" }}></i>
                </div>
                <Card.Title className="fw-bold">Gestión de Personas</Card.Title>
                <Card.Text className="flex-grow-1">
                  Mantén un registro completo de entrenadores y clientes con toda su información relevante.
                </Card.Text>
                <Button as={Link} to="/personas" variant="outline-success" className="w-100">
                  Ir a Personas
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 animated-card" style={{ animationDelay: "0.2s" }}>
              <Card.Body className="d-flex flex-column">
                <div className="text-center mb-4">
                  <i className="bi bi-graph-up text-danger" style={{ fontSize: "3rem" }}></i>
                </div>
                <Card.Title className="fw-bold">Estadísticas y Reportes</Card.Title>
                <Card.Text className="flex-grow-1">
                  Visualiza rápidamente las estadísticas clave de tus gimnasios y miembros.
                </Card.Text>
                <Button as={Link} to="/" variant="outline-danger" className="w-100">
                  Ver Dashboard
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;