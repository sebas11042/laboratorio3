import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container text-center mt-5">
            <h1>🎓 Bienvenido a la plataforma educativa</h1>
            <div className="d-grid gap-3 col-6 mx-auto mt-4">
                <Link to="/aulas" className="btn btn-primary">Ir a Aulas</Link>
                <Link to="/profesores" className="btn btn-success">Ir a Profesores</Link>
                <Link to="/cursos" className="btn btn-warning">Ir a Cursos</Link>
            </div>
        </div>
    );
}

export default Home;
