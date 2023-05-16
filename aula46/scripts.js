// // como criar um objeto

// let pessoa = {
//     nome: "edu",
//     profissao: 'web developer',
//     idade: 27,

//     // adicionando uma propriedade com uma funcao
//     dizerOla: function () {
//         console.log('ola mundo');
//     }
// }

// console.log(pessoa.nome)

// //como alterar o valkor armazenado em uma chave
// pessoa.nome = 'eduardo genes'

// console.log(pessoa.nome);

// // como adicionar uma nova propriedade em um objeto
// pessoa.tecnologias = ['java', 'javascript', 'python', 'php']

// console.log(pessoa);

// pessoa.dizerOla()

/* 
1.  crie um objeto chamado produto com as propriedades
 - codigo
 - nome 
 - preco

2. adicione os valores que quiser e exiba o objeto no console


*/

// let produto = {
//     codigo: '1',
//     nome: 'teclado',
//     preco: 50
// }

// console.log(` codigo: ${produto.codigo}\n produto: ${produto.nome}\n valor: ${produto.preco}`);


// const aluno = {
//     matricula : 1,
//     nome: 'edu genes',
//     idade: 17,
//     curso: 'informatica'
// }

// const informatica = {
//     disciplinas : [ 'java', 'javascript', 'POO']
// }

// const design = {
//     disciplinas : ['teoria das cores', 'photoshop', 'ilustrator']
// }

// if (aluno.curso == 'informatica'){
//     // como copiar as propriedades de um objeto para outro
//     // Object.assign(obj1, obj2)
    
//     Object.assign(aluno, informatica)
// }

// console.log(aluno);


let pessoa = {
    nome: 'edu',
    profissao: 'web developer',
    idade: 27
}

// desestruturando um objeto

let {nome, profissao, idade} = pessoa
console.log(nome)
console.log(profissao)
console.log(idade)