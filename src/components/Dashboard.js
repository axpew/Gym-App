import React, { useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { gimnasios, personas } = useContext(AppContext);
  
  const entrenadores = personas.filter(p => p.esEntrenador).length;
  const hombres = personas.filter(p => p.tipo === 'hombre').length;
  const mujeres = personas.filter(p => p.tipo === 'mujer').length;
  const gimnasiosCrossfit = gimnasios.filter(g => g.tieneCrossfit).length;
  
  // Total de personas
  const totalPersonas = personas.length;

  return (
    <Row className="g-4 mt-2">
      <Col md={6} lg={3}>
        <Card className="text-center h-100 shadow-sm border-0">
          <Card.Body>
            <h1 className="display-4 text-primary">{gimnasios.length}</h1>
            <Card.Title>Gimnasios</Card.Title>
            <Card.Text>
              Total de gimnasios registrados
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={6} lg={3}>
        <Card className="text-center h-100 shadow-sm border-0">
          <Card.Body>
            <h1 className="display-4 text-success">{gimnasiosCrossfit}</h1>
            <Card.Title>Con CrossFit</Card.Title>
            <Card.Text>
              Gimnasios que ofrecen CrossFit
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={6} lg={3}>
        <Card className="text-center h-100 shadow-sm border-0">
          <Card.Body>
            <h1 className="display-4 text-danger">{entrenadores}</h1>
            <Card.Title>Entrenadores</Card.Title>
            <Card.Text>
              {entrenadores} entrenadores registrados
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={6} lg={3}>
        <Card className="text-center h-100 shadow-sm border-0">
          <Card.Body>
            <h1 className="display-4 text-info">{totalPersonas}</h1>
            <Card.Title>Personas</Card.Title>
            <Card.Text>
              {hombres} hombres y {mujeres} mujeres
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;