import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';
import ImageUploader from './ImageUploader';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  direccion: Yup.string().required('La dirección es obligatoria'),
  descripcion: Yup.string().required('La descripción es obligatoria')
});

const GimnasioForm = ({ gimnasio, onSave, mode = 'crear' }) => {
  const { agregarGimnasio, actualizarGimnasio } = useContext(AppContext);
  const [imagenUrl, setImagenUrl] = useState(gimnasio?.imagenUrl || '');

  const initialValues = {
    nombre: gimnasio?.nombre || '',
    direccion: gimnasio?.direccion || '',
    tieneCrossfit: gimnasio?.tieneCrossfit || false,
    descripcion: gimnasio?.descripcion || ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const gimnasioData = {
      ...values,
      imagenUrl
    };

    if (mode === 'editar' && gimnasio) {
      actualizarGimnasio(gimnasio.id, gimnasioData);
    } else {
      agregarGimnasio(gimnasioData);
    }

    setSubmitting(false);
    if (onSave) onSave();
    if (mode !== 'editar') resetForm();
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <Card.Title className="mb-4">
          {mode === 'editar' ? 'Editar Gimnasio' : 'Nuevo Gimnasio'}
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
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={values.direccion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.direccion && errors.direccion}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.direccion}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Tiene Crossfit"
                  name="tieneCrossfit"
                  checked={values.tieneCrossfit}
                  onChange={handleChange}
                />
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
                  {isSubmitting ? 'Guardando...' : mode === 'editar' ? 'Actualizar Gimnasio' : 'Crear Gimnasio'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default GimnasioForm;