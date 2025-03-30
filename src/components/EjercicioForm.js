import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';
import ImageUploader from './ImageUploader';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  categoria: Yup.string().required('La categoría es obligatoria'),
  descripcion: Yup.string().required('La descripción es obligatoria')
});

const EjercicioForm = ({ ejercicio, onSave, mode = 'crear' }) => {
  const { agregarEjercicio, actualizarEjercicio } = useContext(AppContext);
  const [imagenUrl, setImagenUrl] = useState(ejercicio?.imagenUrl || '');

  const initialValues = {
    nombre: ejercicio?.nombre || '',
    categoria: ejercicio?.categoria || '',
    descripcion: ejercicio?.descripcion || ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const ejercicioData = {
      ...values,
      imagenUrl
    };

    if (mode === 'editar' && ejercicio) {
      actualizarEjercicio(ejercicio.id, ejercicioData);
    } else {
      agregarEjercicio(ejercicioData);
    }

    setSubmitting(false);
    if (onSave) onSave();
    if (mode !== 'editar') resetForm();
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <Card.Title className="mb-4">
          {mode === 'editar' ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}
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
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="categoria"
                  value={values.categoria}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.categoria && errors.categoria}
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="Pecho">Pecho</option>
                  <option value="Espalda">Espalda</option>
                  <option value="Piernas">Piernas</option>
                  <option value="Hombros">Hombros</option>
                  <option value="Brazos">Brazos</option>
                  <option value="Abdominales">Abdominales</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.categoria}
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
                  {isSubmitting ? 'Guardando...' : mode === 'editar' ? 'Actualizar Ejercicio' : 'Crear Ejercicio'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default EjercicioForm;