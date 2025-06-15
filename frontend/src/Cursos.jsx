import { useEffect, useState } from "react";

function Cursos() {
    const [cursos, setCursos] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const [form, setForm] = useState({
        id: 0,
        nombre: "",
        cupo: "",
        profesorId: "",
        aulaId: ""
    });

    const [mensaje, setMensaje] = useState("");

    const cargarCursos = async () => {
        try {
            const res = await fetch("/api/cursos");
            const data = await res.json();
            setCursos(data);
        } catch (err) {
            console.error("Error al cargar cursos", err);
        }
    };

    const cargarOpciones = async () => {
        try {
            const resProfs = await fetch("/api/profesores");
            const resAulas = await fetch("/api/aulas");
            const dataProfs = await resProfs.json();
            const dataAulas = await resAulas.json();
            setProfesores(dataProfs);
            setAulas(dataAulas);
        } catch (err) {
            console.error("Error al cargar profesores o aulas", err);
        }
    };

    const guardarCurso = async (e) => {
        e.preventDefault();
        const metodo = form.id === 0 ? "POST" : "PUT";
        const url = `/api/cursos${form.id === 0 ? "" : `/${form.id}`}`;

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setMensaje("✅ Curso guardado correctamente");
                setForm({ id: 0, nombre: "", cupo: "", profesorId: "", aulaId: "" });
                cargarCursos();
            } else {
                setMensaje("❌ Error al guardar el curso");
            }
        } catch (err) {
            console.error("Error al guardar curso", err);
            setMensaje("❌ Error en la petición");
        }
    };

    const editarCurso = (curso) => {
        setForm({
            id: curso.id,
            nombre: curso.nombre,
            cupo: curso.cupo,
            profesorId: curso.profesorId,
            aulaId: curso.aulaId
        });
    };

    const eliminarCurso = async (id) => {
        if (!window.confirm("¿Eliminar este curso?")) return;
        await fetch(`/api/cursos/${id}`, { method: "DELETE" });
        cargarCursos();
    };

    useEffect(() => {
        cargarCursos();
        cargarOpciones();
    }, []);

    const cursosFiltrados = cursos.filter(c =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div>
            <h2 className="mb-4">📚 Gestión de Cursos</h2>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="🔍 Buscar curso por nombre..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
            />

            <table className="table table-bordered table-hover table-dark">
                <thead className="table-light text-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Cupo</th>
                        <th>Profesor</th>
                        <th>Aula</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cursosFiltrados.map((c) => (
                        <tr key={c.id}>
                            <td>{c.nombre}</td>
                            <td>{c.cupo}</td>
                            <td>{c.profesor?.nombre || "No asignado"}</td>
                            <td>{c.aula?.nombre || "No asignado"}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => editarCurso(c)}>
                                    ✏️
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => eliminarCurso(c.id)}>
                                    🗑
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4 className="mt-4">Registrar Curso</h4>
            <form className="bg-secondary p-4 rounded" onSubmit={guardarCurso}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cupo</label>
                    <input type="number" className="form-control" value={form.cupo} onChange={(e) => setForm({ ...form, cupo: parseInt(e.target.value) })} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Profesor</label>
                    <select className="form-control" value={form.profesorId} onChange={(e) => setForm({ ...form, profesorId: parseInt(e.target.value) })} required>
                        <option value="">Seleccione un profesor</option>
                        {profesores.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Aula</label>
                    <select className="form-control" value={form.aulaId} onChange={(e) => setForm({ ...form, aulaId: parseInt(e.target.value) })} required>
                        <option value="">Seleccione un aula</option>
                        {aulas.map(a => (
                            <option key={a.id} value={a.id}>{a.nombre}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar</button>
            </form>

            {mensaje && <div className="mt-3 alert alert-info text-center">{mensaje}</div>}
        </div>
    );
}

export default Cursos;
