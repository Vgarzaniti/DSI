import { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/pages/AltaCliente.css";

export default function AltaCliente() {
    const [dni, setDni] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [numTel, setNumTel] = useState("");

    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto con los datos del cliente
        const clienteData = {
            dni,
            nombre,
            apellido,
            numtel: numTel,  // Asegurarse de que el nombre del campo es "numtel"
        };

        try {
            // Enviar los datos al backend
            const response = await fetch("http://localhost:8000/app/cliente/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(clienteData),
            });

            if (response.ok) {
                // Si la respuesta es exitosa, redirigir a /conexiones
                alert("Cliente creado exitosamente");
                navigate("/conexiones");
            } else {
                // Si la respuesta no es exitosa, mostrar un error
                const errorData = await response.json();
                alert("Error al crear el cliente: " + errorData.detail);
            }
        } catch (error) {
            // Manejo de errores en caso de que no se pueda conectar al backend
            alert("Hubo un problema al crear el cliente: " + error.message);
        }
    };

    // Función para manejar la acción de retroceder
    const handleBack = () => {
        navigate("/conexiones");
    };

    return (
        <div className="container">
            <IconButton onClick={handleBack} className="back-button">
                <ArrowBackIcon />
            </IconButton>
            <h2>Alta de Cliente</h2>
            <form onSubmit={handleSubmit} className="form">
                <TextField
                    label="DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="input"
                    type="number"
                    required
                />

                <TextField
                    label="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="input"
                    required
                />

                <TextField
                    label="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="input"
                    required
                />

                <TextField
                    label="Número de Teléfono"
                    value={numTel}
                    onChange={(e) => setNumTel(e.target.value)}
                    className="input"
                    type="tel"
                    required
                />

                <Button type="submit" variant="contained" color="primary" className="button">
                    Guardar Cliente
                </Button>
            </form>
        </div>
    );
}

