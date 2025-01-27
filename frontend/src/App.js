import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Realizamos la solicitud GET a tu API de Django
    fetch('http://localhost:8000/api/mi-endpoint') // Cambia esto por tu URL de la API
      .then(response => response.json())  // Convierte la respuesta en JSON
      .then(data => setData(data))        // Guarda los datos en el estado
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Aplicación React conectada con Django</h1>
        {data ? (
          <div>
            <h2>Datos desde Django:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </header>
    </div>
  );
}

export default App;

