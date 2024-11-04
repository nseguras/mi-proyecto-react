import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);  // Para manejar el estado de carga

  const handleSum = async () => {
    setLoading(true); // Inicia la carga
    setResult(null);  // Resetea el resultado antes de la nueva suma

    try {
      const response = await fetch('http://127.0.0.1:5000/sum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num1: Number(num1), num2: Number(num2) }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      setResult(data.result); // Actualiza el resultado con la respuesta del servidor
    } catch (error) {
      console.error(error);
      setResult('Error al conectar con el servidor'); // Muestra el error en la interfaz
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Suma de Dos Números</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Número 1"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Número 2"
      />
      <button onClick={handleSum} disabled={loading}>Sumar</button> {/* Deshabilita el botón mientras se carga */}
      <h2>Resultado: {loading ? 'Cargando...' : (result !== null ? result : 'Esperando...')}</h2> {/* Muestra "Cargando..." mientras se espera la respuesta */}
    </div>
  );
}

export default App;
