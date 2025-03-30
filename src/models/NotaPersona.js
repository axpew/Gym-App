export class NotaPersona {
    constructor(id, personaId, fecha, contenido, tipo = "general") {
      this.id = id;
      this.personaId = personaId;
      this.fecha = fecha || new Date();
      this.contenido = contenido;
      this.tipo = tipo; // Puede ser: "general", "progreso", "comportamiento", etc.
    }
  
    actualizarInfo(nuevosDatos) {
      this.fecha = nuevosDatos.fecha || this.fecha;
      this.contenido = nuevosDatos.contenido || this.contenido;
      this.tipo = nuevosDatos.tipo || this.tipo;
    }
  }