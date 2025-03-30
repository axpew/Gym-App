import React, { useContext, useState } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import GimnasioForm from './GimnasioForm';
import '../styles/Gimnasio.css';

const GimnasioCard = ({ gimnasio }) => {
  const { eliminarGimnasio, getPersonasPorGimnasio } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const personas = getPersonasPorGimnasio(gimnasio.id);
  
  const handleEliminar = () => {
    eliminarGimnasio(gimnasio.id);
    setShowModal(false);
  };

  return (
    <>
      <Card className="gimnasio-card h-100 shadow-sm border-0">
        <div className="gimnasio-image-container">
          {gimnasio.imagenUrl ? (
            <div className="gimnasio-image-wrapper">
              <Card.Img variant="top" src={gimnasio.imagenUrl} className="gimnasio-image" />
            </div>
          ) : (
            <div className="gimnasio-placeholder">
              <i className="bi bi-building"></i>
            </div>
          )}
        </div>
        
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title>{gimnasio.nombre}</Card.Title>
            {gimnasio.tieneCrossfit && (
              <Badge bg="success" pill>CrossFit</Badge>
            )}
          </div>
          
          <Card.Subtitle className="mb-2 text-muted">
            {gimnasio.direccion}
          </Card.Subtitle>
          
          <Card.Text className="flex-grow-1">
            {gimnasio.descripcion}
          </Card.Text>
          
          <div className="mt-3">
            <Badge bg="info">
              {personas.length} {personas.length === 1 ? 'persona' : 'personas'}
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
          ¿Estás seguro de que deseas eliminar el gimnasio "{gimnasio.nombre}"?
          {personas.length > 0 && (
            <div className="alert alert-warning mt-3">
              ¡Atención! Este gimnasio tiene {personas.length} {personas.length === 1 ? 'persona' : 'personas'} asociadas que también serán eliminadas.
            </div>
          )}
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
          <Modal.Title>Editar Gimnasio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GimnasioForm 
            gimnasio={gimnasio} 
            mode="editar" 
            onSave={() => setShowEditModal(false)} 
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GimnasioCard;