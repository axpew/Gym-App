export class NotaPersona {
    constructor(id, personaId, fecha, contenido, tipo = "general") {
      this.id = id;
      this.personaId = personaId;
      
      // Asegurarse de que la fecha es un objeto Date con la hora fija a mediodía
      if (fecha instanceof Date) {
        const newDate = new Date(fecha);
        newDate.setHours(12, 0, 0, 0);
        this.fecha = newDate;
      } else {
        const newDate = new Date();
        newDate.setHours(12, 0, 0, 0);
        this.fecha = newDate;
      }
      
      this.contenido = contenido;
      this.tipo = tipo;
    }
  
    actualizarInfo(nuevosDatos) {
      if (nuevosDatos.fecha) {
        // Mismo tratamiento para actualizaciones
        const newDate = new Date(nuevosDatos.fecha);
        newDate.setHours(12, 0, 0, 0);
        this.fecha = newDate;
      }
      this.contenido = nuevosDatos.contenido || this.contenido;
      this.tipo = nuevosDatos.tipo || this.tipo;
    }
  }