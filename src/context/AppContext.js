import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Gimnasio } from '../models/Gimnasio';
import { Persona } from '../models/Persona';
import { Ejercicio } from '../models/Ejercicio';
import { RegistroEjercicio } from '../models/RegistroEjercicio';
import { NotaPersona } from '../models/NotaPersona';
import { EntradaDiario } from '../models/EntradaDiario';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gimnasios, setGimnasios] = useState(() => {
    const savedGimnasios = localStorage.getItem('gimnasios');
    if (savedGimnasios) {
      return JSON.parse(savedGimnasios).map(gym => {
        const gimnasio = new Gimnasio(
          gym.id, 
          gym.nombre, 
          gym.direccion, 
          gym.tieneCrossfit, 
          gym.descripcion, 
          gym.imagenUrl
        );
        gimnasio.fechaCreacion = new Date(gym.fechaCreacion);
        return gimnasio;
      });
    }
    return [];
  });

  const [personas, setPersonas] = useState(() => {
    const savedPersonas = localStorage.getItem('personas');
    if (savedPersonas) {
      return JSON.parse(savedPersonas).map(p => {
        const persona = new Persona(
          p.id, 
          p.nombre, 
          p.edad, 
          p.tipo, 
          p.gimnasioId, 
          p.descripcion, 
          p.esEntrenador || false,  // Añadimos soporte para datos antiguos
          p.imagenUrl
        );
        persona.fechaRegistro = new Date(p.fechaRegistro);
        return persona;
      });
    }
    return [];
  });

  // Nuevo estado para ejercicios
  const [ejercicios, setEjercicios] = useState(() => {
    const savedEjercicios = localStorage.getItem('ejercicios');
    if (savedEjercicios) {
      return JSON.parse(savedEjercicios).map(ej => {
        const ejercicio = new Ejercicio(
          ej.id,
          ej.nombre,
          ej.categoria,
          ej.descripcion,
          ej.imagenUrl
        );
        ejercicio.fechaCreacion = new Date(ej.fechaCreacion);
        return ejercicio;
      });
    }
    return [];
  });

  // Nuevo estado para registros de ejercicios
  const [registrosEjercicios, setRegistrosEjercicios] = useState(() => {
    const savedRegistros = localStorage.getItem('registrosEjercicios');
    if (savedRegistros) {
      return JSON.parse(savedRegistros).map(reg => {
        const registro = new RegistroEjercicio(
          reg.id,
          reg.personaId,
          reg.ejercicioId,
          new Date(reg.fecha),
          reg.peso,
          reg.repeticiones,
          reg.series,
          reg.notas
        );
        return registro;
      });
    }
    return [];
  });

  // Estado para notas de personas
const [notasPersonas, setNotasPersonas] = useState(() => {
  const savedNotas = localStorage.getItem('notasPersonas');
  if (savedNotas) {
    return JSON.parse(savedNotas).map(nota => {
      const notaPersona = new NotaPersona(
        nota.id,
        nota.personaId,
        new Date(nota.fecha),
        nota.contenido,
        nota.tipo
      );
      return notaPersona;
    });
  }
  return [];
});

// Estado para entradas del diario
const [entradasDiario, setEntradasDiario] = useState(() => {
  const savedEntradas = localStorage.getItem('entradasDiario');
  if (savedEntradas) {
    return JSON.parse(savedEntradas).map(entrada => {
      const entradaDiario = new EntradaDiario(
        entrada.id,
        entrada.gimnasioId,
        new Date(entrada.fecha),
        entrada.titulo,
        entrada.contenido,
        entrada.etiquetas
      );
      return entradaDiario;
    });
  }
  return [];
});

  // Guardar en localStorage cuando cambien los datos
  useEffect(() => {
    localStorage.setItem('gimnasios', JSON.stringify(gimnasios));
  }, [gimnasios]);

  useEffect(() => {
    localStorage.setItem('personas', JSON.stringify(personas));
  }, [personas]);

  // Nuevos useEffect para guardar ejercicios y registros
  useEffect(() => {
    localStorage.setItem('ejercicios', JSON.stringify(ejercicios));
  }, [ejercicios]);

  useEffect(() => {
    localStorage.setItem('registrosEjercicios', JSON.stringify(registrosEjercicios));
  }, [registrosEjercicios]);

  // UseEffect para guardar notas de personas
useEffect(() => {
  localStorage.setItem('notasPersonas', JSON.stringify(notasPersonas));
}, [notasPersonas]);

// UseEffect para guardar entradas del diario
useEffect(() => {
  localStorage.setItem('entradasDiario', JSON.stringify(entradasDiario));
}, [entradasDiario]);


  // Funciones para gimnasios
  const agregarGimnasio = (gimnasioData) => {
    const nuevoGimnasio = new Gimnasio(
      uuidv4(),
      gimnasioData.nombre,
      gimnasioData.direccion,
      gimnasioData.tieneCrossfit,
      gimnasioData.descripcion,
      gimnasioData.imagenUrl
    );
    setGimnasios([...gimnasios, nuevoGimnasio]);
    return nuevoGimnasio;
  };

  const actualizarGimnasio = (id, gimnasioData) => {
    setGimnasios(gimnasios.map(gimnasio => {
      if (gimnasio.id === id) {
        gimnasio.actualizarInfo(gimnasioData);
        return gimnasio;
      }
      return gimnasio;
    }));
  };

  const eliminarGimnasio = (id) => {
    setGimnasios(gimnasios.filter(gimnasio => gimnasio.id !== id));
    // También eliminar personas asociadas a este gimnasio
    setPersonas(personas.filter(persona => persona.gimnasioId !== id));
  };

  const getGimnasio = (id) => {
    return gimnasios.find(gimnasio => gimnasio.id === id);
  };

  // Funciones para personas
  const agregarPersona = (personaData) => {
    const nuevaPersona = new Persona(
      uuidv4(),
      personaData.nombre,
      personaData.edad,
      personaData.tipo,
      personaData.gimnasioId,
      personaData.descripcion,
      personaData.esEntrenador,
      personaData.imagenUrl
    );
    setPersonas([...personas, nuevaPersona]);
    return nuevaPersona;
  };

  const actualizarPersona = (id, personaData) => {
    setPersonas(personas.map(persona => {
      if (persona.id === id) {
        persona.actualizarInfo(personaData);
        return persona;
      }
      return persona;
    }));
  };

  const eliminarPersona = (id) => {
    setPersonas(personas.filter(persona => persona.id !== id));
    // También eliminar registros de ejercicios asociados a esta persona
    setRegistrosEjercicios(registrosEjercicios.filter(registro => registro.personaId !== id));
  };

  const getPersona = (id) => {
    return personas.find(persona => persona.id === id);
  };

  const getPersonasPorGimnasio = (gimnasioId) => {
    return personas.filter(persona => persona.gimnasioId === gimnasioId);
  };

  // Nuevas funciones para ejercicios
  const agregarEjercicio = (ejercicioData) => {
    const nuevoEjercicio = new Ejercicio(
      uuidv4(),
      ejercicioData.nombre,
      ejercicioData.categoria,
      ejercicioData.descripcion,
      ejercicioData.imagenUrl
    );
    setEjercicios([...ejercicios, nuevoEjercicio]);
    return nuevoEjercicio;
  };

  const actualizarEjercicio = (id, ejercicioData) => {
    setEjercicios(ejercicios.map(ejercicio => {
      if (ejercicio.id === id) {
        ejercicio.actualizarInfo(ejercicioData);
        return ejercicio;
      }
      return ejercicio;
    }));
  };

  const eliminarEjercicio = (id) => {
    setEjercicios(ejercicios.filter(ejercicio => ejercicio.id !== id));
    // También eliminar registros asociados a este ejercicio
    setRegistrosEjercicios(registrosEjercicios.filter(registro => registro.ejercicioId !== id));
  };

  const getEjercicio = (id) => {
    return ejercicios.find(ejercicio => ejercicio.id === id);
  };

  // Funciones para registros de ejercicios
  const agregarRegistroEjercicio = (registroData) => {
    const nuevoRegistro = new RegistroEjercicio(
      uuidv4(),
      registroData.personaId,
      registroData.ejercicioId,
      registroData.fecha || new Date(),
      registroData.peso,
      registroData.repeticiones,
      registroData.series,
      registroData.notas
    );
    setRegistrosEjercicios([...registrosEjercicios, nuevoRegistro]);
    return nuevoRegistro;
  };

  const actualizarRegistroEjercicio = (id, registroData) => {
    setRegistrosEjercicios(registrosEjercicios.map(registro => {
      if (registro.id === id) {
        registro.actualizarInfo(registroData);
        return registro;
      }
      return registro;
    }));
  };

  const eliminarRegistroEjercicio = (id) => {
    setRegistrosEjercicios(registrosEjercicios.filter(registro => registro.id !== id));
  };

  const getRegistroEjercicio = (id) => {
    return registrosEjercicios.find(registro => registro.id === id);
  };

  const getRegistrosPorPersona = (personaId) => {
    return registrosEjercicios.filter(registro => registro.personaId === personaId);
  };

  const getRegistrosPorEjercicio = (ejercicioId) => {
    return registrosEjercicios.filter(registro => registro.ejercicioId === ejercicioId);
  };

  const getRegistrosPorPersonaYEjercicio = (personaId, ejercicioId) => {
    return registrosEjercicios.filter(
      registro => registro.personaId === personaId && registro.ejercicioId === ejercicioId
    );
  };

  // Funciones para notas de personas
const agregarNotaPersona = (notaData) => {
  const nuevaNota = new NotaPersona(
    uuidv4(),
    notaData.personaId,
    notaData.fecha || new Date(),
    notaData.contenido,
    notaData.tipo
  );
  setNotasPersonas([...notasPersonas, nuevaNota]);
  return nuevaNota;
};

const actualizarNotaPersona = (id, notaData) => {
  setNotasPersonas(notasPersonas.map(nota => {
    if (nota.id === id) {
      nota.actualizarInfo(notaData);
      return nota;
    }
    return nota;
  }));
};

const eliminarNotaPersona = (id) => {
  setNotasPersonas(notasPersonas.filter(nota => nota.id !== id));
};

const getNotaPersona = (id) => {
  return notasPersonas.find(nota => nota.id === id);
};

const getNotasPorPersona = (personaId) => {
  return notasPersonas.filter(nota => nota.personaId === personaId)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha descendente
};

// Funciones para entradas del diario
const agregarEntradaDiario = (entradaData) => {
  const nuevaEntrada = new EntradaDiario(
    uuidv4(),
    entradaData.gimnasioId,
    entradaData.fecha || new Date(),
    entradaData.titulo,
    entradaData.contenido,
    entradaData.etiquetas
  );
  setEntradasDiario([...entradasDiario, nuevaEntrada]);
  return nuevaEntrada;
};

const actualizarEntradaDiario = (id, entradaData) => {
  setEntradasDiario(entradasDiario.map(entrada => {
    if (entrada.id === id) {
      entrada.actualizarInfo(entradaData);
      return entrada;
    }
    return entrada;
  }));
};

const eliminarEntradaDiario = (id) => {
  setEntradasDiario(entradasDiario.filter(entrada => entrada.id !== id));
};

const getEntradaDiario = (id) => {
  return entradasDiario.find(entrada => entrada.id === id);
};

const getEntradasPorGimnasio = (gimnasioId) => {
  return entradasDiario.filter(entrada => entrada.gimnasioId === gimnasioId)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha descendente
};

const getTodasEntradasDiario = () => {
  return entradasDiario.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
};

  // Ahora incluimos todas las funciones y estados en el Provider
  return (
    <AppContext.Provider
      value={{
        gimnasios,
        personas,
        ejercicios,
        registrosEjercicios,
        agregarGimnasio,
        actualizarGimnasio,
        eliminarGimnasio,
        getGimnasio,
        agregarPersona,
        actualizarPersona,
        eliminarPersona,
        getPersona,
        getPersonasPorGimnasio,
        agregarEjercicio,
        actualizarEjercicio,
        eliminarEjercicio,
        getEjercicio,
        agregarRegistroEjercicio,
        actualizarRegistroEjercicio,
        eliminarRegistroEjercicio,
        getRegistroEjercicio,
        getRegistrosPorPersona,
        getRegistrosPorEjercicio,
        getRegistrosPorPersonaYEjercicio,
        /* Nuevas propiedades */
        notasPersonas,
        entradasDiario,
        agregarNotaPersona,
        actualizarNotaPersona,
        eliminarNotaPersona,
        getNotaPersona,
        getNotasPorPersona,
        agregarEntradaDiario,
        actualizarEntradaDiario,
        eliminarEntradaDiario,
        getEntradaDiario,
        getEntradasPorGimnasio,
        getTodasEntradasDiario,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};