export class Ejercicio {
    constructor(id, nombre, categoria, descripcion, imagenUrl = null) {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria; // Por ejemplo: "Pecho", "Piernas", "Espalda", etc.
      this.descripcion = descripcion;
      this.imagenUrl = imagenUrl;
      this.fechaCreacion = new Date();
    }
  
    actualizarInfo(nuevosDatos) {
      this.nombre = nuevosDatos.nombre || this.nombre;
      this.categoria = nuevosDatos.categoria || this.categoria;
      this.descripcion = nuevosDatos.descripcion || this.descripcion;
      this.imagenUrl = nuevosDatos.imagenUrl || this.imagenUrl;
    }
  }