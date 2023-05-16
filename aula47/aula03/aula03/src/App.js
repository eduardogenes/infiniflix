import logo from './logo.svg';
import './App.css';
import AteLogo from './components/AteLogo';
import BemVindo from './components/BemVindo';

//importando imagens
import User from './user.png';
import User1 from './user1.jpg';
import User2 from './user2.png';




function App() {

  function handleClick(e) {
    alert('voce clicou no botão');
    
    // exibindo o objeto do evento
    alert(e);
    
  }

  function handleSaudacao(nome) {
    alert(`Seja bem vindo, ${nome}`)
  }

  const alunos = [
    {matricula: 1, nome: "Fernando", curso: "Javascript", foto: User},
    {matricula: 2, nome: "Mariana", curso: "Python", foto: User1},
    {matricula: 3, nome: "Gabriel", curso: "Javascript", foto: User2}
  ]

  const turma = '219DFS';
  const hora = 22;

  return (
    <div className="App">
        <h1>Aula 03 - Turma {turma} </h1>

        {hora >= 22 ? <BemVindo/> : <AteLogo/>}

        <div className="alunosContainer">
          {/* utilizando map para renderizar varios elementos */}

        {
          alunos.map((aluno) => 
          <div className="cardAluno" key={aluno.matricula}>
            <img src={aluno.foto} alt="foto"/>
            <p>{aluno.matricula}</p>
            <p>{aluno.nome}</p>
            <p>{aluno.curso}</p>

          </div>
          )
        }
        </div>

        {/* passando atributos/parametros para um componente */}
        <BemVindo
        matricula="1"
        nome="Bernardo"
        curso="Javascript"
        nota="8.5"
        evento={handleClick}
        />

        <AteLogo
        nome="Elias"
        curso="Python"
        nota="10"/>



        <h1>Trabalhando com eventos</h1>
        <button onClick={handleClick}>Clique aqui</button>
        
        <button onClick={() => handleSaudacao("fernando")}>Saudação</button>


    </div>
  );
}

export default App;
