export class RegistroEjercicio {
    constructor(id, personaId, ejercicioId, fecha, peso, repeticiones, series, notas = "") {
      this.id = id;
      this.personaId = personaId;
      this.ejercicioId = ejercicioId;
      this.fecha = fecha || new Date();
      this.peso = peso; // Peso en kg
      this.repeticiones = repeticiones;
      this.series = series;
      this.notas = notas;
    }
  
    actualizarInfo(nuevosDatos) {
      this.fecha = nuevosDatos.fecha || this.fecha;
      this.peso = nuevosDatos.peso !== undefined ? nuevosDatos.peso : this.peso;
      this.repeticiones = nuevosDatos.repeticiones !== undefined ? nuevosDatos.repeticiones : this.repeticiones;
      this.series = nuevosDatos.series !== undefined ? nuevosDatos.series : this.series;
      this.notas = nuevosDatos.notas || this.notas;
    }
  }