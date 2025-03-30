import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, Card, Table, Badge, Form, Modal } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import RegistroEjercicioForm from '../components/RegistroEjercicioForm';

const RegistrosPage = () => {
  const { registrosEjercicios, personas, ejercicios, getPersona, getEjercicio, eliminarRegistroEjercicio } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [editingRegistro, setEditingRegistro] = useState(null);
  const [filterPersona, setFilterPersona] = useState('todas');
  const [filterEjercicio, setFilterEjercicio] = useState('todos');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registroToDelete, setRegistroToDelete] = useState(null);

  // Filtrar registros
  const filteredRegistros = registrosEjercicios.filter(registro => {
    const matchesPersona = filterPersona === 'todas' || registro.personaId === filterPersona;
    const matchesEjercicio = filterEjercicio === 'todos' || registro.ejercicioId === filterEjercicio;
    
    return matchesPersona && matchesEjercicio;
  }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha, más reciente primero

  const handleEditRegistro = (registro) => {
    setEditingRegistro(registro);
    setShowForm(true);
  };

  const handleDeleteClick = (registro) => {
    setRegistroToDelete(registro);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (registroToDelete) {
      eliminarRegistroEjercicio(registroToDelete.id);
      setShowDeleteModal(false);
      setRegistroToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-0">Registros de Ejercicios</h1>
          <p className="text-muted">Seguimiento de progreso en tus entrenamientos</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant={showForm ? "secondary" : "primary"} 
            onClick={() => {
              setEditingRegistro(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancelar" : "Agregar Registro"}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <RegistroEjercicioForm 
              registro={editingRegistro} 
              mode={editingRegistro ? "editar" : "crear"} 
              onSave={() => {
                setShowForm(false);
                setEditingRegistro(null);
              }} 
            />
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filtrar por Persona</Form.Label>
            <Form.Select
              value={filterPersona}
              onChange={(e) => setFilterPersona(e.target.value)}
            >
              <option value="todas">Todas las personas</option>
              {personas.map(persona => (
                <option key={persona.id} value={persona.id}>
                  {persona.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filtrar por Ejercicio</Form.Label>
            <Form.Select
              value={filterEjercicio}
              onChange={(e) => setFilterEjercicio(e.target.value)}
            >
              <option value="todos">Todos los ejercicios</option>
              {ejercicios.map(ejercicio => (
                <option key={ejercicio.id} value={ejercicio.id}>
                  {ejercicio.nombre} ({ejercicio.categoria})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {filteredRegistros.length === 0 ? (
        <div className="text-center my-5 py-5">
          <h3>No se encontraron registros</h3>
          <p className="text-muted">
            {registrosEjercicios.length === 0 
              ? "Agrega el primer registro haciendo clic en el botón 'Agregar Registro'"
              : "Prueba con otros filtros o agrega nuevos registros"}
          </p>
        </div>
      ) : (
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Persona</th>
                  <th>Ejercicio</th>
                  <th>Peso</th>
                  <th>Series x Repeticiones</th>
                  <th>Notas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistros.map(registro => {
                  const persona = getPersona(registro.personaId);
                  const ejercicio = getEjercicio(registro.ejercicioId);
                  
                  return (
                    <tr key={registro.id}>
                      <td>{formatDate(registro.fecha)}</td>
                      <td>
                        {persona ? (
                          <div className="d-flex align-items-center">
                            {persona.nombre}
                            {persona.esEntrenador && (
                              <Badge bg="danger" className="ms-2" pill>Entrenador</Badge>
                            )}
                          </div>
                        ) : 'Persona no encontrada'}
                      </td>
                      <td>
                        {ejercicio ? (
                          <div className="d-flex align-items-center">
                            {ejercicio.nombre}
                            <Badge bg="info" className="ms-2" pill>{ejercicio.categoria}</Badge>
                          </div>
                        ) : 'Ejercicio no encontrado'}
                      </td>
                      <td><strong>{registro.peso} kg</strong></td>
                      <td>{registro.series} x {registro.repeticiones}</td>
                      <td>{registro.notas}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEditRegistro(registro)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDeleteClick(registro)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Modal de confirmación para eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este registro de ejercicio?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegistrosPage;