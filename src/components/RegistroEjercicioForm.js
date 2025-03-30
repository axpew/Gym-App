import React, { useContext } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';

const validationSchema = Yup.object().shape({
  personaId: Yup.string().required('La persona es obligatoria'),
  ejercicioId: Yup.string().required('El ejercicio es obligatorio'),
  peso: Yup.number()
    .typeError('Debe ser un número')
    .required('El peso es obligatorio')
    .min(0, 'El peso no puede ser negativo'),
  repeticiones: Yup.number()
    .typeError('Debe ser un número')
    .required('Las repeticiones son obligatorias')
    .integer('Debe ser un número entero')
    .min(1, 'Debe hacer al menos 1 repetición'),
  series: Yup.number()
    .typeError('Debe ser un número')
    .required('Las series son obligatorias')
    .integer('Debe ser un número entero')
    .min(1, 'Debe hacer al menos 1 serie'),
  fecha: Yup.date()
    .required('La fecha es obligatoria')
    .max(new Date(), 'No puede ser una fecha futura')
});

const RegistroEjercicioForm = ({ registro, onSave, personaIdPredefinido = null, ejercicioIdPredefinido = null, mode = 'crear' }) => {
  const { personas, ejercicios, agregarRegistroEjercicio, actualizarRegistroEjercicio } = useContext(AppContext);

  const initialValues = {
    personaId: personaIdPredefinido || registro?.personaId || '',
    ejercicioId: ejercicioIdPredefinido || registro?.ejercicioId || '',
    peso: registro?.peso || '',
    repeticiones: registro?.repeticiones || '',
    series: registro?.series || '',
    fecha: registro ? new Date(registro.fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    notas: registro?.notas || ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const registroData = {
      ...values,
      fecha: new Date(values.fecha),
      peso: parseFloat(values.peso),
      repeticiones: parseInt(values.repeticiones),
      series: parseInt(values.series)
    };

    if (mode === 'editar' && registro) {
      actualizarRegistroEjercicio(registro.id, registroData);
    } else {
      agregarRegistroEjercicio(registroData);
    }

    setSubmitting(false);
    if (onSave) onSave();
    if (mode !== 'editar') resetForm();
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <Card.Title className="mb-4">
          {mode === 'editar' ? 'Editar Registro' : 'Nuevo Registro de Ejercicio'}
        </Card.Title>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Persona</Form.Label>
                    <Form.Select
                      name="personaId"
                      value={values.personaId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.personaId && errors.personaId}
                      disabled={personaIdPredefinido !== null}
                    >
                      <option value="">Seleccione una persona</option>
                      {personas.map(persona => (
                        <option key={persona.id} value={persona.id}>
                          {persona.nombre} {persona.esEntrenador ? '(Entrenador)' : ''}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.personaId}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ejercicio</Form.Label>
                    <Form.Select
                      name="ejercicioId"
                      value={values.ejercicioId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.ejercicioId && errors.ejercicioId}
                      disabled={ejercicioIdPredefinido !== null}
                    >
                      <option value="">Seleccione un ejercicio</option>
                      {ejercicios.map(ejercicio => (
                        <option key={ejercicio.id} value={ejercicio.id}>
                          {ejercicio.nombre} ({ejercicio.categoria})
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.ejercicioId}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Peso (kg)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.5"
                      name="peso"
                      value={values.peso}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.peso && errors.peso}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.peso}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Repeticiones</Form.Label>
                    <Form.Control
                      type="number"
                      name="repeticiones"
                      value={values.repeticiones}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.repeticiones && errors.repeticiones}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.repeticiones}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Series</Form.Label>
                    <Form.Control
                      type="number"
                      name="series"
                      value={values.series}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.series && errors.series}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.series}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={values.fecha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.fecha && errors.fecha}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fecha}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Notas</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notas"
                  value={values.notas}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Guardando...' : mode === 'editar' ? 'Actualizar Registro' : 'Guardar Registro'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default RegistroEjercicioForm;