import logo from './logo.svg';
import './App.css';
import TerceiroComponente from "./componentes/TerceiroComponente";




function App() {

  let alunos = [
    {matricula: 1, nome: 'Celio Oliveira', curso: 'react'},
    {matricula: 2, nome: 'Luana Freitas', curso: 'design'},
    {matricula: 3, nome: 'Vagner Sales', curso: 'fotografia'}
  ];

  let produtos = [
    {codigo: 1, nome: 'shampoo', preco: 10, categoria: 'higiene'},
    {codigo: 2, nome: 'mouse', preco: 80, categoria: 'perifericos' },
    {codigo: 3, nome: 'teclado', preco: 200, categoria: 'perifericos'},
    {codigo: 4, nome: 'garrafa', preco: 150, categoria: 'utensilios'}
  ]


  /*
    Função map
    - Nos permite mapear uma lista ou objeto
  */
  //   let lados = [5, 7.5, 9, 7, 8.5, 6.5];

  //   let areas = lados.map((lado) => {
  //     return lado ** 2;
  //   });


  // console.log(areas);


  

  const nome = "eduardo genes";
  //definindo o css
  const estilo = {backgroundColor: "navy",
  color: "yellow",
  fontWeight: "bold",
  fontsize: "25px"};



  // renderização condicional

  function testerRender(profissao) {
    if (profissao === "programador") {
      return <h3>voce nao tem vida social!</h3>
    }
    else {
      return <h1> voce é feliz! </h1>
    }
  }



  return (
    <div className="App">
     <h1>Aprendendo JSX</h1>
     <h2>ola, </h2>
     <h2>Resultado de 2 + 2 = {2+2} </h2>
      {console.log('escrevendo no console via react')}

      <p style={estilo}>
        estilizando css inline
    </p>

    {testerRender("programador")}
    {testerRender("gerente")}

    {/* utilize className */}
    <p className="teste">
        estilizando css inline
    </p>

    <TerceiroComponente/>

    <h2>Lista de alunos</h2>
    <ul>
      {/* renderizando listas*/}
      {alunos.map((aluno) => 
        <li key={aluno.matricula}>{aluno.nome} - {aluno.curso}</li> 
      )}
    </ul>


        <h2>lista de produtos</h2>
        <ul>{produtos.map((produto) => 

          <li key={produto.codigo}> {produto.nome} - {produto.preco} - {produto.categoria}</li>
        )}
        </ul>

    

    </div>
  );
}

export default App;
