import { useState } from "react";
import { IconButton } from "@mui/material";
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
        <>
            <IconButton onClick={handleBack} className="back-button">
                <ArrowBackIcon />
            </IconButton>
            
            <div className="container">
                <div className="content">
                    <form onSubmit={handleSubmit} className="form">
                        <h2>Alta de Cliente</h2>
                        <div className="input-field">
                            <label>DNI</label>
                            <input
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                className="input"
                                type="dni"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <div className="input-field">
                                <label>Nombre</label>
                                <input
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <label>Apellido</label>
                                <input
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Número de teléfono</label>
                            <input
                                value={numTel}
                                onChange={(e) => setNumTel(e.target.value)}
                                className="input"
                                type="tel"
                                required
                            />
                        </div>
                        <button type="submit" className="button">
                            Guardar Cliente
                        </button>
                    </form>
                </div>
            </div>
        </>
    );   
}