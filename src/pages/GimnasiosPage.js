import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import GimnasioCard from '../components/GimnasioCard';
import GimnasioForm from '../components/GimnasioForm';

const GimnasiosPage = () => {
  const { gimnasios } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrossfit, setFilterCrossfit] = useState('todos');

  const filteredGimnasios = gimnasios.filter(gimnasio => {
    const matchesSearch = gimnasio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gimnasio.direccion.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterCrossfit === 'todos') {
      return matchesSearch;
    } else if (filterCrossfit === 'crossfit') {
      return matchesSearch && gimnasio.tieneCrossfit;
    } else {
      return matchesSearch && !gimnasio.tieneCrossfit;
    }
  });

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-0">Gimnasios</h1>
          <p className="text-muted">Administra los gimnasios disponibles</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant={showForm ? "secondary" : "primary"} 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancelar" : "Agregar Gimnasio"}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <GimnasioForm onSave={() => setShowForm(false)} />
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
              placeholder="Buscar gimnasios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterCrossfit}
            onChange={(e) => setFilterCrossfit(e.target.value)}
          >
            <option value="todos">Todos los gimnasios</option>
            <option value="crossfit">Solo con CrossFit</option>
            <option value="sin-crossfit">Sin CrossFit</option>
          </Form.Select>
        </Col>
      </Row>

      {filteredGimnasios.length === 0 ? (
        <div className="text-center my-5 py-5">
          <h3>No se encontraron gimnasios</h3>
          <p className="text-muted">
            {gimnasios.length === 0 
              ? "Agrega el primer gimnasio haciendo clic en el botón 'Agregar Gimnasio'"
              : "Prueba con otros términos de búsqueda o filtros"}
          </p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredGimnasios.map(gimnasio => (
            <Col key={gimnasio.id}>
              <GimnasioCard gimnasio={gimnasio} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GimnasiosPage;