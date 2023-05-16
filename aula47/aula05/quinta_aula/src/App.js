import './App.css';
import Revisao from './components/Revisao';
import ConsumindoAPI from "./components/ConsumindoApi";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NavBar from './components/NavBar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* redirecionamento de paginas */}
          <Route path="/telefones" element={<Navigate to="/contact" />} />

          {/* pagina nao encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* <footer>
        todos os direitos reservados
      </footer> */}

    </div>
  );
}

export default App;
