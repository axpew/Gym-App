import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainNavbar from './components/Navbar';
import Home from './pages/Home';
import GimnasiosPage from './pages/GimnasiosPage';
import PersonasPage from './pages/PersonasPage';
import EjerciciosPage from './pages/EjerciciosPage';
import RegistrosPage from './pages/RegistrosPage';
import NotasPersonasPage from './pages/NotasPersonasPage';
import DiarioGimnasioPage from './pages/DiarioGimnasioPage';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <MainNavbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gimnasios" element={<GimnasiosPage />} />
              <Route path="/personas" element={<PersonasPage />} />
              <Route path="/ejercicios" element={<EjerciciosPage />} />
              <Route path="/registros" element={<RegistrosPage />} />
              <Route path="/notas-personas" element={<NotasPersonasPage />} />
              <Route path="/diario-gimnasio" element={<DiarioGimnasioPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="bg-dark text-white py-4 mt-auto">
            <div className="container text-center">
              <p className="mb-0">© 2025 GymManager - Todos los derechos reservados</p>
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;