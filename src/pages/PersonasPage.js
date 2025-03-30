import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import PersonaCard from '../components/PersonaCard';
import PersonaForm from '../components/PersonaForm';

const PersonasPage = () => {
  const { personas, gimnasios } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const [filterGym, setFilterGym] = useState('todos');
  const [filterEntrenador, setFilterEntrenador] = useState('todos');

  const filteredPersonas = personas.filter(persona => {
    const matchesSearch = persona.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'todos' || persona.tipo === filterType;
    const matchesGym = filterGym === 'todos' || persona.gimnasioId === filterGym;
    const matchesEntrenador = filterEntrenador === 'todos' || 
                            (filterEntrenador === 'entrenadores' && persona.esEntrenador) ||
                            (filterEntrenador === 'no-entrenadores' && !persona.esEntrenador);
    
    return matchesSearch && matchesType && matchesGym && matchesEntrenador;
  });

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-0">Personas</h1>
          <p className="text-muted">Administra entrenadores y clientes</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant={showForm ? "secondary" : "primary"} 
            onClick={() => setShowForm(!showForm)}
            disabled={gimnasios.length === 0}
          >
            {showForm ? "Cancelar" : "Agregar Persona"}
          </Button>
          {gimnasios.length === 0 && (
            <p className="text-danger mt-2">
              Primero debes agregar al menos un gimnasio
            </p>
          )}
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <PersonaForm onSave={() => setShowForm(false)} />
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col md={3}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar personas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="todos">Todos los géneros</option>
            <option value="hombre">Hombres</option>
            <option value="mujer">Mujeres</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={filterEntrenador}
            onChange={(e) => setFilterEntrenador(e.target.value)}
          >
            <option value="todos">Entrenadores y clientes</option>
            <option value="entrenadores">Solo entrenadores</option>
            <option value="no-entrenadores">Solo clientes</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={filterGym}
            onChange={(e) => setFilterGym(e.target.value)}
          >
            <option value="todos">Todos los gimnasios</option>
            {gimnasios.map(gimnasio => (
              <option key={gimnasio.id} value={gimnasio.id}>
                {gimnasio.nombre}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {filteredPersonas.length === 0 ? (
        <div className="text-center my-5 py-5">
          <h3>No se encontraron personas</h3>
          <p className="text-muted">
            {personas.length === 0 
              ? "Agrega la primera persona haciendo clic en el botón 'Agregar Persona'"
              : "Prueba con otros términos de búsqueda o filtros"}
          </p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredPersonas.map(persona => (
            <Col key={persona.id}>
              <PersonaCard persona={persona} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PersonasPage;