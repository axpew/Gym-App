import React, { useContext, useState } from 'react';
import { Form, Button, Card, Badge } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';

const validationSchema = Yup.object().shape({
  titulo: Yup.string().required('El título es obligatorio'),
  contenido: Yup.string().required('El contenido es obligatorio')
});

const EntradaDiarioForm = ({ entrada, onSave, gimnasioIdPredefinido = null, mode = 'crear' }) => {
  const { gimnasios, agregarEntradaDiario, actualizarEntradaDiario } = useContext(AppContext);
  const [etiquetaInput, setEtiquetaInput] = useState('');
  const [etiquetas, setEtiquetas] = useState(entrada?.etiquetas || []);

  const initialValues = {
    gimnasioId: gimnasioIdPredefinido || entrada?.gimnasioId || (gimnasios.length > 0 ? gimnasios[0].id : ''),
    titulo: entrada?.titulo || '',
    contenido: entrada?.contenido || '',
    fecha: entrada ? new Date(entrada.fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  };

  const handleAgregarEtiqueta = () => {
    if (etiquetaInput.trim() && !etiquetas.includes(etiquetaInput.trim())) {
      setEtiquetas([...etiquetas, etiquetaInput.trim()]);
      setEtiquetaInput('');
    }
  };

  const handleEliminarEtiqueta = (etiqueta) => {
    setEtiquetas(etiquetas.filter(e => e !== etiqueta));
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const entradaData = {
      ...values,
      fecha: new Date(values.fecha),
      etiquetas: etiquetas
    };

    if (mode === 'editar' && entrada) {
      actualizarEntradaDiario(entrada.id, entradaData);
    } else {
      agregarEntradaDiario(entradaData);
    }

    setSubmitting(false);
    if (onSave) onSave();
    if (mode !== 'editar') {
      resetForm();
      setEtiquetas([]);
    }
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <Card.Title className="mb-4">
          {mode === 'editar' ? 'Editar Entrada del Diario' : 'Nueva Entrada del Diario'}
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
                <Form.Label>Gimnasio (Opcional)</Form.Label>
                <Form.Select
                  name="gimnasioId"
                  value={values.gimnasioId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={gimnasioIdPredefinido !== null}
                >
                  <option value="">Ninguno (General)</option>
                  {gimnasios.map(gimnasio => (
                    <option key={gimnasio.id} value={gimnasio.id}>
                      {gimnasio.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={values.titulo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.titulo && errors.titulo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.titulo}
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
                <Form.Label>Etiquetas</Form.Label>
                <div className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={etiquetaInput}
                    onChange={(e) => setEtiquetaInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAgregarEtiqueta();
                      }
                    }}
                    placeholder="Añadir etiqueta y presionar Enter"
                  />
                  <Button 
                    variant="outline-secondary" 
                    onClick={handleAgregarEtiqueta}
                    className="ms-2"
                  >
                    Añadir
                  </Button>
                </div>
                <div>
                  {etiquetas.map((etiqueta, index) => (
                    <Badge 
                      key={index} 
                      bg="secondary" 
                      className="me-2 mb-2 p-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEliminarEtiqueta(etiqueta)}
                    >
                      {etiqueta} ×
                    </Badge>
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contenido</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
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
                  {isSubmitting ? 'Guardando...' : mode === 'editar' ? 'Actualizar Entrada' : 'Guardar Entrada'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default EntradaDiarioForm;