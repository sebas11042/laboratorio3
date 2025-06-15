import { useEffect, useState } from 'react';

function App() {
    const [aulas, setAulas] = useState([]);

    useEffect(() => {
        fetch('/api/aulas')
            .then(res => res.json())
            .then(data => setAulas(data))
            .catch(err => console.error("Error:", err));
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Listado de Aulas</h1>
            <ul>
                {aulas.map(aula => (
                    <li key={aula.id}>{aula.nombre} - Capacidad: {aula.capacidad}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
