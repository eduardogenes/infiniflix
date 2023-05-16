

function inserirProduto(){
    // pegando os elementos que iremos usar
    const checkbox = document.querySelector('#maiorIdade')
    const div = document.querySelector('div')

    // verificando se o checkbox está marcado
    if (checkbox.checked){
        // removendo o atributo class='hide'
        div.removeAttribute('class')

        //adicionando o atributo class='show
        div.setAttribute('class', 'show')

    }
    else{
        div.removeAttribute('class')
        div.setAttribute('class', 'hide')
    }

}
