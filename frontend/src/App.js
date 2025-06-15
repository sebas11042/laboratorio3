import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Aulas from './Aulas';
import Profesores from './Profesores';
import Cursos from './Cursos';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aulas" element={<Aulas />} />
            <Route path="/profesores" element={<Profesores />} />
            <Route path="/cursos" element={<Cursos />} />
        </Routes>
    );
}

export default App;
