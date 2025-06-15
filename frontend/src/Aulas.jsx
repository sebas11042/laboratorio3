import { useEffect, useState } from 'react';

export default function Aulas() {
    const [aulas, setAulas] = useState([]);
    const [form, setForm] = useState({ id: '', nombre: '', capacidad: '' });
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        cargarAulas();
    }, []);

    const cargarAulas = async () => {
        try {
            const res = await fetch('https://laboratorio3-ngo0.onrender.com/api/aulas');
            const data = await res.json();
            setAulas(data);
        } catch (error) {
            console.error('Error al cargar aulas:', error);
        }
    };

    const guardarAula = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!form.nombre.trim() || isNaN(parseInt(form.capacidad))) {
            setMensaje("❌ El nombre y la capacidad deben ser válidos");
            return;
        }

        const metodo = form.id ? 'PUT' : 'POST';
        const url = `https://laboratorio3-ngo0.onrender.com/api/aulas${form.id ? `/${form.id}` : ''}`;

        const aulaData = {
            ...form,
            capacidad: Number(form.capacidad)
        };

        const options = {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aulaData)
        };

        try {
            const res = await fetch(url, options);
            if (res.ok) {
                setMensaje(`✅ Aula ${form.id ? 'actualizada' : 'registrada'} correctamente`);
                setForm({ id: '', nombre: '', capacidad: '' });
                cargarAulas();
            } else {
                const errorDetail = await res.text();
                console.error("❌ Detalle del error:", errorDetail);
                setMensaje('❌ Error al guardar el aula');
            }
        } catch (error) {
            console.error('❌ Error en la petición:', error);
            setMensaje('❌ Error en la conexión con el servidor');
        }
    };


    const editar = (aula) => {
        setForm(aula);
    };

    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar esta aula?')) return;
        try {
            const res = await fetch(`https://laboratorio3-ngo0.onrender.com/api/aulas/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                cargarAulas();
            }
        } catch (error) {
            console.error('Error al eliminar aula:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>🏫 Listado de Aulas</h2>
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {aulas.map((aula) => (
                        <tr key={aula.id}>
                            <td>{aula.id}</td>
                            <td>{aula.nombre}</td>
                            <td>{aula.capacidad}</td>
                            <td>
                                <button onClick={() => editar(aula)} className="btn btn-warning btn-sm me-2">✏️</button>
                                <button onClick={() => eliminar(aula.id)} className="btn btn-danger btn-sm">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4>{form.id ? 'Editar Aula' : 'Registrar Aula'}</h4>
            <form onSubmit={guardarAula}>
                <input type="hidden" value={form.id} />
                <input
                    type="text"
                    placeholder="Nombre"
                    className="form-control mb-2"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Capacidad"
                    className="form-control mb-2"
                    value={form.capacidad}
                    onChange={(e) => setForm({ ...form, capacidad: e.target.value })}
                    required
                />
                <button type="submit" className="btn btn-primary w-100">Guardar</button>
            </form>

            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
}
