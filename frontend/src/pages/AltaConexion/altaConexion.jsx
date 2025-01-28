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

export default function AltaConexion() {
    const navigate = useNavigate(); // Inicializar el hook
    const [tabIndex, setTabIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
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

    const searchClientes = (dni) => {
        fetch(`http://localhost:8000/app/cliente/?dni=${dni}`)
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Error buscando clientes:", error));
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
        const finalDate = `${day}/${month}/${year}`;
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
        }
    };

    // Función para guardar en el localStorage
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            numero,
            fecha_alta: selectedDate,
            cantidad_megas: selectedMegas,
            precio,
            calle,
            departamento,
            numero_domicilio: numeroDomicilio,
            piso,
            localidad: selectedLocalidad,
            cliente: selectedCliente?.idcliente, // Asumimos que el cliente tiene un idcliente
        };

        // Guardar los datos en el localStorage
        localStorage.setItem("conexionData", JSON.stringify(data));

        // Confirmación o redirigir después de guardar
        console.log("Conexión guardada en localStorage:", data);
        alert("Datos guardados en el localStorage");
    };

    // Recuperar los datos del localStorage cuando se monte el componente
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("conexionData"));
        if (storedData) {
            setNumero(storedData.numero);
            setSelectedDate(storedData.fecha_alta);
            setSelectedMegas(storedData.cantidad_megas);
            setPrecio(storedData.precio);
            setCalle(storedData.calle);
            setDepartamento(storedData.departamento);
            setNumeroDomicilio(storedData.numero_domicilio);
            setPiso(storedData.piso);
            setSelectedLocalidad(storedData.localidad);
            setSelectedCliente(storedData.cliente); // Si quieres mostrar también el cliente
        }
    }, []); // Este useEffect solo se ejecuta una vez al montar el componente

    return (
        <div className="container">
            <Tabs
                value={tabIndex}
                onChange={(e, newIndex) => setTabIndex(newIndex)}
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
                    <form className="form" onSubmit={handleSubmit}>
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
                        <button type="submit" className="button">
                            Guardar
                        </button>
                    </form>
                )}

                {tabIndex === 1 && (
                    <form className="form">
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
                            Guardar
                        </button>
                    </form>
                )}

                {tabIndex === 2 && (
                    <div className="form">
                        <h2>Seleccionar Cliente</h2>
                        <div className="search-bar" style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                variant="outlined"
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

                        {/* Mostrar los clientes filtrados */}
                        {clientes.length > 0 && (
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
                    </div>
                )}
            </div>
        </div>
    );
}
