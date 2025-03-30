import React, { useContext, useState } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import PersonaForm from './PersonaForm';
import '../styles/Persona.css';

const PersonaCard = ({ persona }) => {
  const { eliminarPersona, getGimnasio } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const gimnasio = getGimnasio(persona.gimnasioId);
  
  const handleEliminar = () => {
    eliminarPersona(persona.id);
    setShowModal(false);
  };

  return (
    <>
      <Card className="persona-card h-100 shadow-sm border-0">
        <div className="persona-image-container">
          {persona.imagenUrl ? (
            <div className="persona-image-wrapper">
              <Card.Img variant="top" src={persona.imagenUrl} className="persona-image" />
            </div>
          ) : (
            <div className="persona-placeholder">
              <i className="bi bi-person"></i>
            </div>
          )}
          {persona.esEntrenador && (
            <Badge bg="danger" pill className="badge-entrenador">Entrenador</Badge>
          )}
        </div>
        
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title>{persona.nombre}</Card.Title>
            <Badge bg={persona.tipo === 'hombre' ? 'primary' : 'info'} pill>
              {persona.tipo === 'hombre' ? 'Hombre' : 'Mujer'}
            </Badge>
          </div>
          
          <Card.Subtitle className="mb-2 text-muted">
            {persona.edad} años
          </Card.Subtitle>
          
          <Card.Text className="flex-grow-1">
            {persona.descripcion}
          </Card.Text>
          
          <div className="mt-3">
            <Badge bg="secondary">
              Gimnasio: {gimnasio ? gimnasio.nombre : 'No asignado'}
            </Badge>
          </div>
          
          <div className="d-flex justify-content-between mt-3">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => setShowEditModal(true)}
            >
              Editar
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => setShowModal(true)}
            >
              Eliminar
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal de confirmación para eliminar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar a "{persona.nombre}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar */}
      <Modal 
        show={showEditModal} 
        onHide={() => setShowEditModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PersonaForm 
            persona={persona} 
            mode="editar" 
            onSave={() => setShowEditModal(false)} 
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PersonaCard;