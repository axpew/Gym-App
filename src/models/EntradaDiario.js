export class EntradaDiario {
    constructor(id, gimnasioId, fecha, titulo, contenido, etiquetas = []) {
      this.id = id;
      this.gimnasioId = gimnasioId; // Opcional, si quieres asociarlo a un gimnasio específico
      this.fecha = fecha || new Date();
      this.titulo = titulo;
      this.contenido = contenido;
      this.etiquetas = etiquetas; // Para poder categorizar las entradas
    }
  
    actualizarInfo(nuevosDatos) {
      this.gimnasioId = nuevosDatos.gimnasioId || this.gimnasioId;
      this.fecha = nuevosDatos.fecha || this.fecha;
      this.titulo = nuevosDatos.titulo || this.titulo;
      this.contenido = nuevosDatos.contenido || this.contenido;
      this.etiquetas = nuevosDatos.etiquetas || this.etiquetas;
    }
  }