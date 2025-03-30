import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ImageUploader = ({ onImageUpload, currentImage }) => {
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-3">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Seleccionar imagen</Form.Label>
        <Form.Control 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </Form.Group>
      
      {previewUrl && (
        <div className="text-center mt-3">
          <img 
            src={previewUrl} 
            alt="Vista previa" 
            className="img-thumbnail" 
            style={{ maxHeight: '200px' }} 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;