import 'bootstrap/dist/css/bootstrap.min.css';
import Aulas from './Aulas';
import Profesores from './Profesores';
import Cursos from './Cursos';

function App() {
    return (
        <div className="App container mt-5">
            <Aulas />
            <hr className="my-5" />
            <Profesores />
            <hr className="my-5" />
            <Cursos />
        </div>
    );
}

export default App;
