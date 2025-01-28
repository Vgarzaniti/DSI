import { useState } from "react";
import { Tabs, Tab, MenuItem, Select, TextField, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import "../../assets/styles/pages/AltaConexion.css";

export default function AltaConexion() {
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedMegas, setSelectedMegas] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const megasDisponibles = [10, 20, 50, 100]; // Datos desde la base de datos
    const trabajadores = ["Juan Pérez", "Ana Gómez", "Carlos López", "María Rodríguez"]; // Ejemplo de datos

    return (
        <div className="container">
        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} className="tabs">
            <Tab label="Conexión" className="tab" />
            <Tab label="Domicilio" className="tab" />
            <Tab label="Cliente" className="tab" />
        </Tabs>
        
        <div className="content">
            {tabIndex === 0 && (
            <form className="form">
                <h2>Cargar Datos de una Conexión</h2>
                <div className="column">
                <input type="number" placeholder="Número" value={12345} disabled className="input" />
                <input type="datetime-local" placeholder="Fecha Alta" value={new Date().toISOString().slice(0, 16)} disabled className="input" />
                <input type="number" placeholder="Precio" value={500} disabled className="input" />
                <Select value={selectedMegas} onChange={(e) => setSelectedMegas(e.target.value)} className="select">
                    {megasDisponibles.map((megas, index) => (
                    <MenuItem key={index} value={megas}>{megas} MB</MenuItem>
                    ))}
                </Select>
                </div>
                <button type="submit" className="button">Guardar</button>
            </form>
            )}
            
            {tabIndex === 1 && (
            <form className="form">
                <h2>Alta de un Domicilio</h2>
                <div className="column">
                <input type="text" placeholder="Calle" className="input" />
                <input type="text" placeholder="Departamento" className="input" />
                <input type="number" placeholder="Número" className="input" />
                <input type="number" placeholder="Piso" className="input" />
                <input type="number" placeholder="Localidad" className="input" />
                </div>
                <button type="submit" className="button">Guardar</button>
            </form>
            )}
            
            {tabIndex === 2 && (
            <div className="form">
                <h2>Seleccionar Trabajador</h2>
                <div className="search-bar">
                <TextField 
                    variant="outlined" 
                    placeholder="Buscar trabajador..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="input" 
                />
                <IconButton className="add-button">
                    <Add />
                </IconButton>
                </div>
                <div className="worker-list">
                {trabajadores.filter(trabajador => trabajador.toLowerCase().includes(searchTerm.toLowerCase())).map((trabajador, index) => (
                    <div key={index} className="worker-item">{trabajador}</div>
                ))}
                </div>
            </div>
            )}
        </div>
        </div>
    );
}