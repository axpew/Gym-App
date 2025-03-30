import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Form, Badge, Modal } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import EntradaDiarioForm from '../components/EntradaDiarioForm';

const DiarioGimnasioPage = () => {
  const { entradasDiario, gimnasios, getGimnasio, eliminarEntradaDiario } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [editingEntrada, setEditingEntrada] = useState(null);
  const [filterGimnasio, setFilterGimnasio] = useState('todos');
  const [filterEtiqueta, setFilterEtiqueta] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entradaToDelete, setEntradaToDelete] = useState(null);
  const [entradas, setEntradas] = useState([]);
  const [todasEtiquetas, setTodasEtiquetas] = useState([]);

  // Recopilar todas las etiquetas únicas
  useEffect(() => {
    const etiquetas = new Set();
    entradasDiario.forEach(entrada => {
      if (entrada.etiquetas && entrada.etiquetas.length > 0) {
        entrada.etiquetas.forEach(etiqueta => etiquetas.add(etiqueta));
      }
    });
    setTodasEtiquetas(Array.from(etiquetas).sort());
  }, [entradasDiario]);

  // Filtrar entradas
  useEffect(() => {
    let filteredEntradas = [...entradasDiario];
    
    if (filterGimnasio !== 'todos') {
      filteredEntradas = filteredEntradas.filter(entrada => 
        entrada.gimnasioId === filterGimnasio || 
        (filterGimnasio === 'ninguno' && !entrada.gimnasioId)
      );
    }
    
    if (filterEtiqueta) {
      filteredEntradas = filteredEntradas.filter(entrada => 
        entrada.etiquetas && entrada.etiquetas.includes(filterEtiqueta)
      );
    }
    
    // Ordenar por fecha, más reciente primero
    filteredEntradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    setEntradas(filteredEntradas);
  }, [entradasDiario, filterGimnasio, filterEtiqueta]);

  const handleEditEntrada = (entrada) => {
    setEditingEntrada(entrada);
    setShowForm(true);
  };

  const handleDeleteClick = (entrada) => {
    setEntradaToDelete(entrada);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (entradaToDelete) {
      eliminarEntradaDiario(entradaToDelete.id);
      setShowDeleteModal(false);
      setEntradaToDelete(null);
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
          <h1 className="mb-0">Diario del Gimnasio</h1>
          <p className="text-muted">Registra eventos, observaciones y notas importantes</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant={showForm ? "secondary" : "primary"} 
            onClick={() => {
              setEditingEntrada(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancelar" : "Nueva Entrada"}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col lg={10} className="mx-auto">
            <EntradaDiarioForm 
              entrada={editingEntrada} 
              mode={editingEntrada ? "editar" : "crear"} 
              onSave={() => {
                setShowForm(false);
                setEditingEntrada(null);
              }} 
            />
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filtrar por Gimnasio</Form.Label>
            <Form.Select
              value={filterGimnasio}
              onChange={(e) => setFilterGimnasio(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="ninguno">Sin gimnasio asignado</option>
              {gimnasios.map(gimnasio => (
                <option key={gimnasio.id} value={gimnasio.id}>
                  {gimnasio.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filtrar por Etiqueta</Form.Label>
            <Form.Select
              value={filterEtiqueta}
              onChange={(e) => setFilterEtiqueta(e.target.value)}
            >
              <option value="">Todas las etiquetas</option>
              {todasEtiquetas.map((etiqueta, index) => (
                <option key={index} value={etiqueta}>
                  {etiqueta}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {entradas.length === 0 ? (
        <div className="text-center my-5 py-5">
          <h3>No se encontraron entradas en el diario</h3>
          <p className="text-muted">
            {entradasDiario.length === 0 
              ? "Crea la primera entrada haciendo clic en el botón 'Nueva Entrada'"
              : "Prueba con otros filtros o crea nuevas entradas"}
          </p>
        </div>
      ) : (
        <div className="timeline">
          {entradas.map((entrada, index) => {
            const gimnasio = entrada.gimnasioId ? getGimnasio(entrada.gimnasioId) : null;
            
            return (
              <Card key={entrada.id} className="mb-4 shadow-sm border-0">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">{entrada.titulo}</h5>
                    <small>{formatDate(entrada.fecha)}</small>
                    {gimnasio && (
                      <Badge bg="primary" className="ms-2">
                        {gimnasio.nombre}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleEditEntrada(entrada)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDeleteClick(entrada)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Text style={{ whiteSpace: 'pre-line' }}>
                    {entrada.contenido}
                  </Card.Text>
                  
                  {entrada.etiquetas && entrada.etiquetas.length > 0 && (
                    <div className="mt-3">
                      {entrada.etiquetas.map((etiqueta, idx) => (
                        <Badge 
                          key={idx} 
                          bg="secondary" 
                          className="me-2"
                          onClick={() => setFilterEtiqueta(etiqueta)}
                          style={{ cursor: 'pointer' }}
                        >
                          {etiqueta}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta entrada del diario?
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

export default DiarioGimnasioPage;