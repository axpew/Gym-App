import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import EjercicioCard from '../components/EjercicioCard';
import EjercicioForm from '../components/EjercicioForm';

const EjerciciosPage = () => {
  const { ejercicios } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('todas');

  const filteredEjercicios = ejercicios.filter(ejercicio => {
    const matchesSearch = ejercicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ejercicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    return filterCategoria === 'todas' ? matchesSearch : (matchesSearch && ejercicio.categoria === filterCategoria);
  });

  // Obtener categorías únicas para el filtro
  const categorias = ['todas', ...new Set(ejercicios.map(ej => ej.categoria))];

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-0">Ejercicios</h1>
          <p className="text-muted">Administra tu catálogo de ejercicios</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant={showForm ? "secondary" : "primary"} 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancelar" : "Agregar Ejercicio"}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <EjercicioForm onSave={() => setShowForm(false)} />
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar ejercicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
          >
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria === 'todas' ? 'Todas las categorías' : categoria}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {filteredEjercicios.length === 0 ? (
        <div className="text-center my-5 py-5">
          <h3>No se encontraron ejercicios</h3>
          <p className="text-muted">
            {ejercicios.length === 0 
              ? "Agrega el primer ejercicio haciendo clic en el botón 'Agregar Ejercicio'"
              : "Prueba con otros términos de búsqueda o filtros"}
          </p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredEjercicios.map(ejercicio => (
            <Col key={ejercicio.id}>
              <EjercicioCard ejercicio={ejercicio} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default EjerciciosPage;