import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Badge,
  Modal,
  Image,
} from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import NotaPersonaForm from "../components/NotaPersonaForm";

const NotasPersonasPage = () => {
  const { notasPersonas, personas, getPersona, eliminarNotaPersona } =
    useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [editingNota, setEditingNota] = useState(null);
  const [filterPersona, setFilterPersona] = useState("todas");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notaToDelete, setNotaToDelete] = useState(null);
  const [notas, setNotas] = useState([]);

  // Filtrar notas
  useEffect(() => {
    let filteredNotas = [...notasPersonas];

    if (filterPersona !== "todas") {
      filteredNotas = filteredNotas.filter(
        (nota) => nota.personaId === filterPersona
      );
    }

    if (filterTipo !== "todos") {
      filteredNotas = filteredNotas.filter((nota) => nota.tipo === filterTipo);
    }

    // Ordenar por fecha, más reciente primero
    filteredNotas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    setNotas(filteredNotas);
  }, [notasPersonas, filterPersona, filterTipo]);

  const handleEditNota = (nota) => {
    setEditingNota(nota);
    setShowForm(true);
  };

  const handleDeleteClick = (nota) => {
    setNotaToDelete(nota);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (notaToDelete) {
      eliminarNotaPersona(notaToDelete.id);
      setShowDeleteModal(false);
      setNotaToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBadgeColor = (tipo) => {
    switch (tipo) {
      case "progreso":
        return "success";
      case "comportamiento":
        return "warning";
      case "observacion":
        return "info";
      case "recordatorio":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-0">Notas de Personas</h1>
          <p className="text-muted">
            Registra observaciones y seguimiento de las personas
          </p>
        </Col>
        <Col xs="auto">
          <Button
            variant={showForm ? "secondary" : "primary"}
            onClick={() => {
              setEditingNota(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancelar" : "Agregar Nota"}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <NotaPersonaForm
              nota={editingNota}
              mode={editingNota ? "editar" : "crear"}
              onSave={() => {
                setShowForm(false);
                setEditingNota(null);
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
              {personas.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filtrar por Tipo</Form.Label>
            <Form.Select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
            >
              <option value="todos">Todos los tipos</option>
              <option value="general">General</option>
              <option value="progreso">Progreso</option>
              <option value="comportamiento">Comportamiento</option>
              <option value="observacion">Observación</option>
              <option value="recordatorio">Recordatorio</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {notas.length === 0 ? (
        <div className="text-center my-5 py-5">
          <h3>No se encontraron notas</h3>
          <p className="text-muted">
            {notasPersonas.length === 0
              ? "Agrega la primera nota haciendo clic en el botón 'Agregar Nota'"
              : "Prueba con otros filtros o agrega nuevas notas"}
          </p>
        </div>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {notas.map((nota) => {
            const persona = getPersona(nota.personaId);

            return (
              <Col key={nota.id}>
                <Card className="h-100 shadow-sm border-0 nota-card">
                  <Card.Header className="d-flex justify-content-between align-items-center py-2">
                    <Badge bg={getBadgeColor(nota.tipo)} className="me-auto">
                      {nota.tipo.charAt(0).toUpperCase() + nota.tipo.slice(1)}
                    </Badge>
                    <small className="text-muted">
                      {formatDate(nota.fecha)}
                    </small>
                  </Card.Header>

                  {persona && (
                    <div className="persona-info-container p-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          {persona.imagenUrl ? (
                            <Image
                              src={persona.imagenUrl}
                              roundedCircle
                              width={80} // Cambiado de 50 a 80
                              height={80} // Cambiado de 50 a 80
                              style={{
                                objectFit: "cover",
                                border: "2px solid #fff",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                              }}
                            />
                          ) : (
                            <div className="persona-placeholder-large">
                              <i className="bi bi-person"></i>
                            </div>
                          )}
                        </div>
                        <div>
                          <h5 className="mb-0 fw-bold">{persona.nombre}</h5>
                          <div>
                            {persona.esEntrenador && (
                              <Badge bg="danger" className="me-1" pill>
                                Entrenador
                              </Badge>
                            )}
                            <Badge
                              bg={
                                persona.tipo === "hombre" ? "primary" : "info"
                              }
                              pill
                            >
                              {persona.tipo === "hombre" ? "Hombre" : "Mujer"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Card.Body>
                    <Card.Text className="nota-contenido">
                      {nota.contenido}
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer className="bg-white border-top-0">
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditNota(nota)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteClick(nota)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Modal de confirmación para eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar esta nota?</Modal.Body>
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

export default NotasPersonasPage;
