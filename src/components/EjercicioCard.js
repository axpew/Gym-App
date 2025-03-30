import React, { useContext, useState } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import EjercicioForm from './EjercicioForm';
import '../styles/Ejercicio.css';

const EjercicioCard = ({ ejercicio }) => {
  const { eliminarEjercicio, getRegistrosPorEjercicio } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const registros = getRegistrosPorEjercicio(ejercicio.id);
  
  const handleEliminar = () => {
    eliminarEjercicio(ejercicio.id);
    setShowModal(false);
  };

  const getCategoriaColor = () => {
    switch(ejercicio.categoria) {
      case 'Pecho': return 'primary';
      case 'Espalda': return 'success';
      case 'Piernas': return 'danger';
      case 'Hombros': return 'warning';
      case 'Brazos': return 'info';
      case 'Abdominales': return 'dark';
      case 'Cardiovascular': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <>
      <Card className="ejercicio-card h-100 shadow-sm border-0">
        <div className="ejercicio-image-container">
          {ejercicio.imagenUrl ? (
            <div className="ejercicio-image-wrapper">
              <Card.Img variant="top" src={ejercicio.imagenUrl} className="ejercicio-image" />
            </div>
          ) : (
            <div className="ejercicio-placeholder">
              <i className="bi bi-activity"></i>
            </div>
          )}
          <Badge bg={getCategoriaColor()} pill className="badge-categoria">
            {ejercicio.categoria}
          </Badge>
        </div>
        
        <Card.Body className="d-flex flex-column">
          <Card.Title>{ejercicio.nombre}</Card.Title>
          
          <Card.Text className="flex-grow-1">
            {ejercicio.descripcion}
          </Card.Text>
          
          <div className="mt-3">
            <Badge bg="info">
              {registros.length} {registros.length === 1 ? 'registro' : 'registros'}
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
          ¿Estás seguro de que deseas eliminar el ejercicio "{ejercicio.nombre}"?
          {registros.length > 0 && (
            <div className="alert alert-warning mt-3">
              ¡Atención! Este ejercicio tiene {registros.length} {registros.length === 1 ? 'registro' : 'registros'} que también se eliminarán.
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
          <Modal.Title>Editar Ejercicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EjercicioForm 
            ejercicio={ejercicio} 
            mode="editar" 
            onSave={() => setShowEditModal(false)} 
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EjercicioCard;