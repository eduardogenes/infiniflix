function inserirProduto(){
    // como pegar um elemento
    const produto = document.querySelector('#produto');
    const ul = document.querySelector('ul');

    // como criar uym elemento
    const li = document.createElement('li');

    // como inserir conteudo dentro de uma tag
    li.innerText = produto.value;

    alert('produto adicionado com sucesso!!')
    ul.appendChild(li)
}