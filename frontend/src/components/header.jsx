import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/components/header.css';

function Header() {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible); 
    };

    const inicio = () => {
        navigate('/'); // Redirige a la página principal
    };

    return (
        <header className="header">
            <div>
                <nav>
                    <ul className="menu_horizontal">
                        <li onClick={inicio}>Inicio</li>
                        <li onClick={toggleMenu}>Menú</li>
                        {menuVisible && ( // Renderiza el menú si está visible
                            <ul className="menu_vertical">
                                <li><Link to="/Conexiones">Alta Conexion</Link></li>
                                <li><Link to="/AltaCliente">Alta Cliente</Link></li>
                                <li><Link to="/AltaOperacion">Alta Operacion</Link></li>
                                <li><Link to="/ProgramarVisita">Programar Visita</Link></li>
                            </ul>
                        )}
                    </ul>
                    <h1>Grupo 21</h1>
                </nav>
            </div>
        </header>
    );
}

export default Header;
