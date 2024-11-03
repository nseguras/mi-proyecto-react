import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleSum = async () => {
    try {
      const response = await fetch('http://192.168.1.90:5000/sum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ num1: Number(num1), num2: Number(num2) })
      });
      
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
      setResult('Error al conectar con el servidor');
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
      <button onClick={handleSum}>Sumar</button>
      <h2>Resultado: {result !== null ? result : 'Esperando...'}</h2>
    </div>
  );
}

export default App;
