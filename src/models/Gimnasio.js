export class Gimnasio {
    constructor(id, nombre, direccion, tieneCrossfit, descripcion, imagenUrl = null) {
      this.id = id;
      this.nombre = nombre;
      this.direccion = direccion;
      this.tieneCrossfit = tieneCrossfit;
      this.descripcion = descripcion;
      this.imagenUrl = imagenUrl;
      this.fechaCreacion = new Date();
    }
  
    actualizarInfo(nuevosDatos) {
      this.nombre = nuevosDatos.nombre || this.nombre;
      this.direccion = nuevosDatos.direccion || this.direccion;
      this.tieneCrossfit = nuevosDatos.tieneCrossfit !== undefined ? nuevosDatos.tieneCrossfit : this.tieneCrossfit;
      this.descripcion = nuevosDatos.descripcion || this.descripcion;
      this.imagenUrl = nuevosDatos.imagenUrl || this.imagenUrl;
    }
  }