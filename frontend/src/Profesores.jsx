import React, { useEffect, useState } from "react";

const Profesores = () => {
    const [profesores, setProfesores] = useState([]);
    const [nombre, setNombre] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [id, setId] = useState(null);
    const [mensaje, setMensaje] = useState("");

    const API_URL = "https://laboratorio3-ngo0.onrender.com/api/profesores";

    const cargarProfesores = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setProfesores(data);
        } catch (err) {
            console.error("Error al cargar profesores:", err);
        }
    };

    useEffect(() => {
        cargarProfesores();
    }, []);

    const guardarProfesor = async (e) => {
        e.preventDefault();
        const profesorData = {
            id,
            nombre: nombre.trim(),
            especialidad: especialidad.trim()
        };

        const response = await fetch(`${API_URL}${id ? `/${id}` : ""}`, {
            method: id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profesorData),
        });

        if (response.ok) {
            setMensaje(`✅ Profesor ${id ? "actualizado" : "registrado"} correctamente`);
            setId(null);
            setNombre("");
            setEspecialidad("");
            cargarProfesores();
        } else {
            setMensaje("❌ Error al guardar profesor");
            console.error("Error detalle:", await response.text());
        }
    };

    const editarProfesor = (profesor) => {
        setId(profesor.id);
        setNombre(profesor.nombre);
        setEspecialidad(profesor.especialidad);
    };

    const eliminarProfesor = async (id) => {
        if (!window.confirm("¿Deseas eliminar este profesor?")) return;
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (res.ok) {
            cargarProfesores();
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">👨‍🏫 Gestión de Profesores</h2>

            <h4>Listado de Profesores</h4>
            <table className="table table-bordered table-dark">
                <thead className="table-light text-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {profesores.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>{p.especialidad}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => editarProfesor(p)}>✏️</button>
                                <button className="btn btn-danger" onClick={() => eliminarProfesor(p.id)}>🗑</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4 className="mt-4">Formulario de Profesor</h4>
            <form onSubmit={guardarProfesor} className="bg-secondary p-4 rounded">
                <input type="hidden" value={id || ""} />
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Especialidad</label>
                    <input className="form-control" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar</button>
                {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
            </form>
        </div>
    );
};

export default Profesores;
