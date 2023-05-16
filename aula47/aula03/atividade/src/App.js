import './App.css';

// importando o hook useState

import { useState } from 'react';

function App() {

  let [nome, setNome] = useState("");
  let [curso, setCurso] = useState("");


  function handleSetNome(e) {
    setNome(e.target.value);
  }

  function handleSetCurso(e) {
    setCurso(e.target.value);
  }


  return (
    <div className="App">
      <label>
        <input type="text" id="nome" onChange={handleSetNome}/>
      </label>

      <label>
        <input type="text" id="curso" onChange={handleSetCurso}/>
      </label>
      <button> Enviar </button>      

      <div>
        <h1>Seus Dados</h1>
        <h3>Nome: {nome}</h3>
        <h3>Curso: {curso}</h3>
      </div>
        
    </div>
  );
}

export default App;
