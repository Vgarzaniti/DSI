import { useState, useEffect } from "react";
import {
    Tabs,
    Tab,
    MenuItem,
    Select,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add"; // Importar el icono de "+" para agregar
import "../../assets/styles/pages/AltaConexion.css";
import { useNavigate } from "react-router-dom"; // Importar el hook
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AltaConexion() {
    const [idServicio, setIdServicio] = useState(null); // Estado para almacenar el id del servicio
    const [idCliente, setIdCliente] = useState(null);  // Para almacenar el ID del cliente
    const [domicilioId, setDomicilioId] = useState(null);  // Para almacenar el ID del domicilio
    const navigate = useNavigate(); // Inicializar el hook
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedMegas, setSelectedMegas] = useState("");
    const [megasDisponibles, setMegasDisponibles] = useState([]);
    const [precio, setPrecio] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const [numero, setNumero] = useState(null);
    const [localidades, setLocalidades] = useState([]);
    const [selectedLocalidad, setSelectedLocalidad] = useState("");
    const [dniSearch, setDniSearch] = useState("");
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [calle, setCalle] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [numeroDomicilio, setNumeroDomicilio] = useState("");
    const [piso, setPiso] = useState("");
    const [mensaje, setMensaje] = useState(""); 

    const handleSubmitDomicilio = async (e) => {
        e.preventDefault();

        // Crear el payload inicial
        const data = {
            localidad: selectedLocalidad,
            calle,
            numero: numeroDomicilio,
        };

        // Agregar `departamento` y `piso` solo si tienen un valor
        if (departamento) {
            data.departamento = departamento;
        }

        if (piso) {
            data.piso = piso;
        }

        console.log("Datos enviados al servidor:", data); // Para verificar el payload

        try {
            const response = await fetch("http://localhost:8000/app/Domicilio-crear/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

            console.log("Estado de la respuesta:", response.status);

        if (response.ok) {
            const result = await response.json();
            
            console.log("Domicilio creado con éxito:", result);
            setMensaje("Domicilio guardado exitosamente");
            setTabIndex(2);

            // Aquí obtienes el 'id' del domicilio creado
            // Almacenas el 'id' en el estado para usarlo más tarde
            setDomicilioId(result.iddomicilio); // Guardamos el ID del domicilio en el estado
            alert(`Domicilio guardado con éxito. El ID del domicilio es: ${result}`);


             // Guardar los datos en localStorage
            const domicilioCompleto = {
                localidad: selectedLocalidad,
                calle,
                numero: numeroDomicilio,
                departamento: departamento || '',  // Solo si tiene valor
                piso: piso || '',  // Solo si tiene valor
            };
            
            // Guardar en localStorage
            localStorage.setItem('domicilioStorage', JSON.stringify(domicilioCompleto));
            localStorage.setItem('clienteStorage', JSON.stringify(selectedCliente)); // Suponiendo que tienes el cliente seleccionado en selectedCliente
            // Aquí obtienes el 'id' del domicilio creado
        } else {
            const errorData = await response.json();
            console.error("Errores del servidor:", errorData);
            setMensaje("Error al guardar el domicilio");
        }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            setMensaje("Error al conectar con el servidor");
        }
    };

    const searchClientes = (dni) => {
        fetch(`http://localhost:8000/app/cliente/?dni=${dni}`)
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Error buscando clientes:", error));
    };

    const handleBack = () => {
        navigate("/");
    };


    // Hacer la búsqueda en tiempo real
    const handleSearchChange = (e) => {
        const search = e.target.value;
        setDniSearch(search);
        if (search.length > 2) {
            searchClientes(search); // Filtrar clientes según lo que escriba el usuario
        } else {
            setClientes([]); // Si no se escribe nada o son menos de 3 caracteres, no mostrar clientes
        }
    };

    const handleSelectCliente = (cliente) => {
        setSelectedCliente(cliente);
        setClientes([]); // Limpiar la lista de clientes al seleccionar uno
        setIdCliente(cliente.idcliente);  // Guardar el idCliente en el estado
        setDniSearch(cliente.dni); // Rellenar el campo de búsqueda con el DNI seleccionado

    };
    

    useEffect(() => {
        fetch("http://localhost:8000/app/localidad/")
            .then((response) => response.json())
            .then((data) => {
                setLocalidades(data);
            })
            .catch((error) => console.error("Error fetching localidades:", error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/app/ultimo-numero/")
            .then((response) => response.json())
            .then((data) => {
                setNumero(data.numero);
            })
            .catch((error) => console.error("Error fetching numero de conexion:", error));
    }, []);

    useEffect(() => {
        const argentinaTime = new Date().toLocaleString("en-US", {
            timeZone: "America/Argentina/Buenos_Aires",
        });
        const formattedDate = new Date(argentinaTime);
        const day = String(formattedDate.getDate()).padStart(2, "0");
        const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
        const year = formattedDate.getFullYear();
        const finalDate = `${year}-${month}-${day}`;
        setSelectedDate(finalDate);
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/app/servicios/")
            .then((response) => response.json())
            .then((data) => {
                setMegasDisponibles(data);
            })
            .catch((error) => {
                console.error("Error fetching servicios:", error);
            });
    }, []);

    const handleSelectMegas = (e) => {
        const selected = e.target.value;
        setSelectedMegas(selected);
        const servicio = megasDisponibles.find(
            (servicio) => servicio.cantidadmegas === selected
        );
        if (servicio) {
            setPrecio(servicio.precio);
            setIdServicio(servicio.idservicio);  // Guardar el id del servicio
        }
    };

    //funcion para usar localstorage
    useEffect(() => {
        const storedDomicilio = JSON.parse(localStorage.getItem('domicilioStorage'));
        const storedCliente = JSON.parse(localStorage.getItem('clienteStorage'));
    
        if (storedDomicilio) {
            console.log("Domicilio guardado en localStorage:", storedDomicilio);
        }
    
        if (storedCliente) {
            console.log("Cliente guardado en localStorage:", storedCliente);
        }
    }, []);

    const handleSubmitConexion = async (e) => {
        e.preventDefault();
        
        // Verificar si los campos obligatorios están llenos
        if (!idCliente || !idServicio || !domicilioId || !numero) {
            alert("Por favor, complete todos los campos antes de guardar la conexión.");
            return;
        }
        
        // Crear el payload de la conexión
        const data = {
            fechaalta: selectedDate,  // Fecha de alta
            numero: numero,           // Número de la conexión
            idcliente: idCliente,     // ID del cliente seleccionado
            idservicio: idServicio,   // ID del servicio seleccionado
            iddomicilio: domicilioId, // ID del domicilio seleccionado
        };
        alert("Datos a enviar al servidor:\n" + JSON.stringify(data, null, 2));
        console.log("Datos enviados al servidor:", data); // Para verificar el payload
    
        try {
            // Enviar los datos al backend para crear la conexión
            const response = await fetch("http://localhost:8000/app/conexion-crear/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok || response.status === 201) {
                const result = await response.json();
                alert("Conexión creada con éxito: " + JSON.stringify(result)); // Mostrar el resultado en un alert
                setMensaje("Conexión guardada exitosamente");
                navigate("/conexiones");  // Redirigir a la lista de conexiones
            } else {
                const errorData = await response.json();
                console.error("Errores del servidor:", errorData);
                alert('error del servidor')
                setMensaje("Error al guardar la conexión");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            alert('error al conectar ocn el servidor')
            setMensaje("Error al conectar con el servidor");
        }
    };

    return (
        <>
            <IconButton onClick={handleBack} className="back-button">
                <ArrowBackIcon />
            </IconButton>
            
            <div className="container">
                <Tabs
                    value={tabIndex}
                    onChange={(event, newIndex) => setTabIndex(newIndex)}
                    className="tabs"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "red",
                        },
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
                                    <input
                                        type="number"
                                        placeholder="Número"
                                        value={numero !== null ? numero : "Cargando..."}
                                        disabled
                                        className="input"
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Fecha Alta</label>
                                    <input
                                        type="text"
                                        placeholder="Fecha Alta"
                                        value={selectedDate}
                                        disabled
                                        className="input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-field">
                                    <label>Cantidad de Megas</label>
                                    <Select
                                        value={selectedMegas}
                                        onChange={handleSelectMegas}
                                        className="select"
                                    >
                                        {megasDisponibles.map((servicio, index) => (
                                            <MenuItem
                                                key={index}
                                                value={servicio.cantidadmegas}
                                            >
                                                {servicio.cantidadmegas} MB
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="input-field">
                                    <label>Precio</label>
                                    <input
                                        type="number"
                                        placeholder="Precio"
                                        value={precio}
                                        disabled
                                        className="input"
                                    />
                                </div>
                            </div>
                            <button onClick={() => setTabIndex(1)} type="submit" className="button">
                                Siguiente
                            </button>
                        </form>
                    )}

                    {tabIndex === 1 && (
                        <form className="form" onSubmit={handleSubmitDomicilio}>
                            <h2>Alta de un Domicilio</h2>
                            <div className="input-field">
                                <label>Localidad</label>
                                <Select
                                    value={selectedLocalidad}
                                    onChange={(e) => setSelectedLocalidad(e.target.value)}
                                    className="select"
                                >
                                    {localidades.map((localidad) => (
                                        <MenuItem
                                            key={localidad.idlocalidad}
                                            value={localidad.idlocalidad}
                                        >
                                            {localidad.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="form-group">
                                <div className="input-field">
                                    <label>Calle</label>
                                    <input
                                        type="text"
                                        placeholder="Calle"
                                        value={calle}
                                        onChange={(e) => setCalle(e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Departamento</label>
                                    <input
                                        type="text"
                                        placeholder="Departamento"
                                        value={departamento}
                                        onChange={(e) => setDepartamento(e.target.value)}
                                        className="input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-field">
                                    <label>Número</label>
                                    <input
                                        type="number"
                                        placeholder="Número"
                                        value={numeroDomicilio}
                                        onChange={(e) => setNumeroDomicilio(e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Piso</label>
                                    <input
                                        type="number"
                                        placeholder="Piso"
                                        value={piso}
                                        onChange={(e) => setPiso(e.target.value)}
                                        className="input"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="button">
                                Siguiente
                            </button>
                        </form>
                    )}

                    {tabIndex === 2 && (
                        <div className="form">
                            <h2>Seleccionar Cliente</h2>
                            <div className="search-bar-container">
                                <div className="search-bar">
                                    <TextField
                                        variant="standard"
                                        placeholder="Buscar cliente por DNI"
                                        value={dniSearch}
                                        onChange={handleSearchChange} // Búsqueda en tiempo real
                                        className="input"
                                        InputProps={{
                                            startAdornment: (
                                                <IconButton className="search-button">
                                                    <Search />
                                                </IconButton>
                                            ),
                                        }}
                                        style={{ flexGrow: 1 }} // Hacer que el buscador se expanda
                                    />
                                    <IconButton
                                        onClick={() => navigate("/cliente")} // Redirigir a /cliente
                                        className="add-button"
                                        style={{ marginLeft: "8px" }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </div>
                            </div>
                            {/* Mostrar los clientes filtrados */}
                            {clientes.length > 0 && (
                                <div className="suggestion-list-container">
                                    <List>
                                        {clientes.map((cliente) => (
                                            <ListItem
                                                button
                                                key={cliente.idcliente}
                                                onClick={() => handleSelectCliente(cliente)}
                                            >
                                                <ListItemText
                                                    primary={`${cliente.dni} - ${cliente.nombre} ${cliente.apellido}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            )}

                            {/* Tabla siempre visible con los datos del cliente seleccionado */}
                            <TableContainer
                                component={Paper}
                                style={{ marginTop: "20px" }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>DNI</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Apellido</TableCell>
                                            <TableCell>Teléfono</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                {selectedCliente ? selectedCliente.dni : ""}
                                            </TableCell>
                                            <TableCell>
                                                {selectedCliente ? selectedCliente.nombre : ""}
                                            </TableCell>
                                            <TableCell>
                                                {selectedCliente ? selectedCliente.apellido : ""}
                                            </TableCell>
                                            <TableCell>
                                                {selectedCliente ? selectedCliente.numtel : ""}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <button onClick={handleSubmitConexion} type="submit" className="button">
                                Guardar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>  
    );
}
