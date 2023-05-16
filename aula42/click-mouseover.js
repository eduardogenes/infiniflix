const btn = document.querySelector('button')

//como adicionar um evento

btn.addEventListener('click', () => {
    alert('voce clicou no botao')
})

btn.addEventListener("mouseover", function(){
    alert('voce passou em cima do botao')
})

