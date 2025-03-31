import React, { useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';

const validationSchema = Yup.object().shape({
  personaId: Yup.string().required('La persona es obligatoria'),
  contenido: Yup.string().required('El contenido de la nota es obligatorio'),
  tipo: Yup.string().required('El tipo de nota es obligatorio')
});

const NotaPersonaForm = ({ nota, onSave, personaIdPredefinido = null, mode = 'crear' }) => {
  const { personas, agregarNotaPersona, actualizarNotaPersona } = useContext(AppContext);

  // Preparar la fecha para el formulario
  const prepararFechaParaFormulario = (fechaObj) => {
    const fecha = new Date(fechaObj);
    // Crear un string en formato YYYY-MM-DD usando valores locales
    const year = fecha.getFullYear();
    // getMonth() devuelve 0-11, así que sumamos 1
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const initialValues = {
    personaId: personaIdPredefinido || nota?.personaId || '',
    contenido: nota?.contenido || '',
    tipo: nota?.tipo || 'general',
    fecha: nota ? prepararFechaParaFormulario(nota.fecha) : prepararFechaParaFormulario(new Date())
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Crear fecha a partir de los componentes para evitar problemas de zona horaria
    const [year, month, day] = values.fecha.split('-').map(num => parseInt(num, 10));
    // month-1 porque en JavaScript los meses van de 0-11
    const fecha = new Date(year, month-1, day, 12, 0, 0, 0);
    
    const notaData = {
      ...values,
      fecha: fecha
    };

    if (mode === 'editar' && nota) {
      actualizarNotaPersona(nota.id, notaData);
    } else {
      agregarNotaPersona(notaData);
    }

    setSubmitting(false);
    if (onSave) onSave();
    if (mode !== 'editar') resetForm();
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <Card.Title className="mb-4">
          {mode === 'editar' ? 'Editar Nota' : 'Nueva Nota'}
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

              <Form.Group className="mb-3">
                <Form.Label>Tipo de Nota</Form.Label>
                <Form.Select
                  name="tipo"
                  value={values.tipo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.tipo && errors.tipo}
                >
                  <option value="general">General</option>
                  <option value="progreso">Progreso</option>
                  <option value="comportamiento">Comportamiento</option>
                  <option value="observacion">Observación</option>
                  <option value="recordatorio">Recordatorio</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.tipo}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={values.fecha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contenido</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="contenido"
                  value={values.contenido}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.contenido && errors.contenido}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contenido}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Guardando...' : mode === 'editar' ? 'Actualizar Nota' : 'Guardar Nota'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default NotaPersonaForm;