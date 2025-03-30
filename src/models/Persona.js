// src/models/Persona.js
export class Persona {
    constructor(id, nombre, edad, tipo, gimnasioId, descripcion, esEntrenador = false, imagenUrl = null) {
      this.id = id;
      this.nombre = nombre;
      this.edad = edad;
      this.tipo = tipo; // 'hombre' o 'mujer'
      this.gimnasioId = gimnasioId;
      this.descripcion = descripcion;
      this.esEntrenador = esEntrenador; // boolean
      this.imagenUrl = imagenUrl;
      this.fechaRegistro = new Date();
    }
  
    actualizarInfo(nuevosDatos) {
      this.nombre = nuevosDatos.nombre || this.nombre;
      this.edad = nuevosDatos.edad || this.edad;
      this.tipo = nuevosDatos.tipo || this.tipo;
      this.gimnasioId = nuevosDatos.gimnasioId || this.gimnasioId;
      this.descripcion = nuevosDatos.descripcion || this.descripcion;
      this.esEntrenador = nuevosDatos.esEntrenador !== undefined ? nuevosDatos.esEntrenador : this.esEntrenador;
      this.imagenUrl = nuevosDatos.imagenUrl || this.imagenUrl;
    }
  }