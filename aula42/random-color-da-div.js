function mudarCor(){

    // gerando valores aleatórios entre 0 e 255
    let red = Math.floor(Math.random() * 256)
    let green = Math.floor(Math.random() * 256)
    let blue = Math.floor(Math.random() * 256)

    // pegando a div
    let div = document.querySelector('div')
    div.style.background = `rgb(${red}, ${green}, ${blue})`
    // div.style.width = `300px`

}

