import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'; // asegurate de tenerlo creado

function Home() {
    return (
        <div className="home-background d-flex flex-column min-vh-100">
            <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center text-white text-center py-5">
                <h1 className="mb-3 display-4 fw-bold">🎓 Administrador de cursos <span className="text-warning">Siquirres</span></h1>
                <p className="lead mb-5">Gestioná fácilmente tus recursos educativos con estilo.</p>

                <div className="row g-4 justify-content-center w-100">
                    {/* Tarjeta Aulas */}
                    <div className="col-md-4">
                        <Link to="/aulas" className="card card-hover h-100 text-decoration-none text-white bg-primary shadow">
                            <div className="card-body text-center">
                                <div className="icon mb-3 display-4">🏫</div>
                                <h5 className="card-title fw-bold">Gestión de Aulas</h5>
                                <p className="card-text">Agregá, editá y visualizá las aulas disponibles.</p>
                            </div>
                        </Link>
                    </div>

                    {/* Tarjeta Profesores */}
                    <div className="col-md-4">
                        <Link to="/profesores" className="card card-hover h-100 text-decoration-none text-white bg-success shadow">
                            <div className="card-body text-center">
                                <div className="icon mb-3 display-4">👨‍🏫</div>
                                <h5 className="card-title fw-bold">Gestión de Profesores</h5>
                                <p className="card-text">Mantené actualizada la información del personal docente.</p>
                            </div>
                        </Link>
                    </div>

                    {/* Tarjeta Cursos */}
                    <div className="col-md-4">
                        <Link to="/cursos" className="card card-hover h-100 text-decoration-none text-dark bg-warning shadow">
                            <div className="card-body text-center">
                                <div className="icon mb-3 display-4">📚</div>
                                <h5 className="card-title fw-bold">Gestión de Cursos</h5>
                                <p className="card-text">Creá y administrá los cursos disponibles en el sistema.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center py-3 text-light bg-dark border-top mt-auto">
                © 2025 - Laboratorio 3 - Lenguajes para aplicaciones comerciales
            </footer>
        </div>
    );
}

export default Home;
