import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';
import ImageUploader from './ImageUploader';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  edad: Yup.number()
    .required('La edad es obligatoria')
    .positive('La edad debe ser positiva')
    .integer('La edad debe ser un número entero'),
  tipo: Yup.string().required('El género es obligatorio'),
  gimnasioId: Yup.string().required('Debe seleccionar un gimnasio'),
  descripcion: Yup.string().required('La descripción es obligatoria')
});

const PersonaForm = ({ persona, onSave, mode = 'crear' }) => {
  const { agregarPersona, actualizarPersona, gimnasios } = useContext(AppContext);
  const [imagenUrl, setImagenUrl] = useState(persona?.imagenUrl || '');

  const initialValues = {
    nombre: persona?.nombre || '',
    edad: persona?.edad || '',
    tipo: persona?.tipo || '',
    esEntrenador: persona?.esEntrenador || false,
    gimnasioId: persona?.gimnasioId || '',
    descripcion: persona?.descripcion || ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const personaData = {
      ...values,
      edad: parseInt(values.edad),
      imagenUrl
    };

    if (mode === 'editar' && persona) {
      actualizarPersona(persona.id, personaData);
    } else {
      agregarPersona(personaData);
    }

    setSubmitting(false);
    if (onSave) onSave();
    if (mode !== 'editar') resetForm();
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <Card.Title className="mb-4">
          {mode === 'editar' ? 'Editar Persona' : 'Nueva Persona'}
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
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.nombre && errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="number"
                  name="edad"
                  value={values.edad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.edad && errors.edad}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.edad}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Género</Form.Label>
                <Form.Select
                  name="tipo"
                  value={values.tipo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.tipo && errors.tipo}
                >
                  <option value="">Seleccione un género</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.tipo}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Es entrenador"
                  name="esEntrenador"
                  checked={values.esEntrenador}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gimnasio</Form.Label>
                <Form.Select
                  name="gimnasioId"
                  value={values.gimnasioId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.gimnasioId && errors.gimnasioId}
                >
                  <option value="">Seleccione un gimnasio</option>
                  {gimnasios.map(gimnasio => (
                    <option key={gimnasio.id} value={gimnasio.id}>
                      {gimnasio.nombre}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gimnasioId}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={values.descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.descripcion && errors.descripcion}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.descripcion}
                </Form.Control.Feedback>
              </Form.Group>

              <ImageUploader 
                onImageUpload={setImagenUrl} 
                currentImage={imagenUrl}
              />

              <div className="d-grid gap-2 mt-4">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Guardando...' : mode === 'editar' ? 'Actualizar Persona' : 'Crear Persona'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default PersonaForm;