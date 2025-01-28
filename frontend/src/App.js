import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/unlogged/NotFound.jsx';
import Landing from './pages/unlogged/Landing.jsx';
import AltaConexion from './pages/AltaConexion/altaConexion.jsx'


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={<Landing />} />

                {/* Otras rutas */}
                <Route path="conexiones" element={<AltaConexion/>} />

                {/* Ruta para manejar páginas no encontradas */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;


