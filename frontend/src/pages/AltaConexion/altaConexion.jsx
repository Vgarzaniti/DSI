import { useState, useEffect} from "react";
import { Tabs, Tab, MenuItem, Select, TextField, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import "../../assets/styles/pages/AltaConexion.css";

export default function AltaConexion() {
    const [tabIndex, setTabIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const trabajadores = ["Juan Pérez", "Ana Gómez", "Carlos López", "María Rodríguez"]; // Ejemplo de datos
    const [selectedMegas, setSelectedMegas] = useState('');
    const [megasDisponibles, setMegasDisponibles] = useState([]);
    const [precio, setPrecio] = useState(0); // Estado para el precio
    const [selectedDate, setSelectedDate] = useState("");
    const [numero, setNumero] = useState(null); // Estado para el número de conexión
    const [localidades, setLocalidades] = useState([]); // Estado para almacenar las localidades
    const [selectedLocalidad, setSelectedLocalidad] = useState(""); // Estado para la localidad seleccionada
    const [dniSearch, setDniSearch] = useState(""); // Estado para almacenar el DNI ingresado
    const [clientes, setClientes] = useState([]); // Estado para almacenar los clientes filtrados
    const [selectedCliente, setSelectedCliente] = useState(null); // Estado para almacenar el cliente seleccionado

    // Función para buscar clientes por DNI
    const searchClientes = (dni) => {
        fetch(`http://localhost:8000/app/clientes/?dni=${dni}`) // Realiza la solicitud a la API
            .then((response) => response.json())
            .then((data) => setClientes(data))  // Guarda los resultados en el estado
            .catch((error) => console.error("Error buscando clientes:", error));
    };

    useEffect(() => {
        if (dniSearch.length > 2) { // Solo buscar si el DNI tiene más de 2 caracteres
            searchClientes(dniSearch);
        } else {
            setClientes([]); // Limpiar resultados si el DNI tiene 2 o menos caracteres
        }
    }, [dniSearch]);

    // Función para manejar la selección de un cliente
    const handleSelectCliente = (cliente) => {
        setSelectedCliente(cliente); // Asignar el cliente seleccionado al estado
        setClientes([]); // Limpiar los resultados de búsqueda
        setDniSearch(cliente.dni); // Rellenar el campo de búsqueda con el DNI del cliente seleccionado
    };

    // Cargar las localidades desde la API
    useEffect(() => {
        fetch('http://localhost:8000/app/localidad/')  // URL de la API que devuelve las localidades
            .then((response) => response.json())
            .then((data) => {
                setLocalidades(data);  // Guardamos las localidades en el estado
            })
            .catch((error) => console.error('Error fetching localidades:', error));
    }, []);
    // Cargar el último número de conexión + 1 desde la API
    useEffect(() => {
        fetch('http://localhost:8000/app/ultimo-numero/')  // URL de la API que devuelve el número
            .then((response) => response.json())
            .then((data) => {
                setNumero(data.numero);  // Establecer el número de la nueva conexión
            })
            .catch((error) => console.error('Error fetching numero de conexion:', error));
    }, []);

    useEffect(() => {
        // Obtener la fecha actual en hora de Argentina (GMT-3)
        const argentinaTime = new Date().toLocaleString("en-US", {
        timeZone: "America/Argentina/Buenos_Aires",
        });

        // Convertir la fecha a formato día/mes/año (dd/mm/yyyy)
        const formattedDate = new Date(argentinaTime);
        const day = String(formattedDate.getDate()).padStart(2, "0"); // Agregar 0 a días menores a 10
        const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
        const year = formattedDate.getFullYear();

        const finalDate = `${day}/${month}/${year}`; // Formato dd/mm/yyyy

        setSelectedDate(finalDate); // Establecemos la fecha en el estado
    }, []);

    // Cargar los servicios desde la API cuando el componente se monte
    useEffect(() => {
        fetch('http://localhost:8000/app/servicios/')  // URL apuntando a la vista APIView de Django
        .then((response) => response.json())
        .then((data) => {
            setMegasDisponibles(data);  // Establecemos los servicios completos en el estado
        })
        .catch((error) => {
            console.error('Error fetching servicios:', error);  // Captura de errores
        });
    }, []);

    // Manejar el cambio en el desplegable de servicios
    const handleSelectMegas = (e) => {
        const selected = e.target.value;
        setSelectedMegas(selected);  // Actualiza el servicio seleccionado

        // Actualiza el precio basándonos en el servicio seleccionado
        const servicio = megasDisponibles.find(servicio => servicio.cantidadmegas === selected);
        if (servicio) {
            setPrecio(servicio.precio);  // Establece el precio del servicio seleccionado
        }
    };
    return (
        <div className="container">
        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} className="tabs"
            TabIndicatorProps={{
                style: {
                    backgroundColor: 'red',  
                }
            }}
        >
            <Tab label="Conexión" className="tab" />
            <Tab label="Domicilio" className="tab" />
            <Tab label="Cliente" className="tab" />
        </Tabs>
        <div className="content">
            {tabIndex === 0 && (
            <form className="form">
                <h2>Cargar Datos de una Conexión</h2>
                <div className="form-group">
                    <div className="input-field">
                        <label>Número</label>
                         {/* Mostrar el número de conexión congelado */}
                        <input
                            type="number"
                            placeholder="Número"
                            value={numero !== null ? numero : 'Cargando...'}  // Si 'numero' no está cargado, mostrar "Cargando..."
                            disabled
                            className="input"
                        />
                    </div>
                    <div className="input-field">
                        <label>Fecha Alta</label>
                        <input type="text" placeholder="Fecha Alta" value={selectedDate} disabled className="input" />
                    </div>
                </div>
            
                <div className="form-group">
                    <div className="input-field">
                        <label>Cantidad de Megas</label>
                        <Select value={selectedMegas} onChange={handleSelectMegas} className="select">
                            {megasDisponibles.map((servicio, index) => (
                                <MenuItem key={index} value={servicio.cantidadmegas}>
                                    {servicio.cantidadmegas} MB
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="input-field">
                        <label>Precio</label>
                        <input type="number" placeholder="Precio" value={precio} disabled className="input" />
                    </div>
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
                {/* Desplegable para seleccionar localidad */}
                <Select
                    value={selectedLocalidad}
                    onChange={(e) => setSelectedLocalidad(e.target.value)}
                    className="select"
                >
                    {localidades.map((localidad) => (
                        <MenuItem key={localidad.idlocalidad} value={localidad.idlocalidad}>
                            {localidad.nombre}  {/* Aquí solo se muestra el nombre */}
                        </MenuItem>
                    ))}
                </Select>
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