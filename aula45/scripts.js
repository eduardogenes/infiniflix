/* Pegando os elementos que serão manipulados */
const x = document.querySelector('.x');
const o = document.querySelector('.o');
const boxes = document.querySelectorAll('.box');
const buttons = document.querySelectorAll('.buttons-container button');
const containerMensagem = document.querySelector('#container-mensagem');
const textoMensagem = document.querySelector('#container-mensagem p');


// Contador de jogadas 
let jogador1 = 0;
let jogador2 = 0;

// inicio do jogo
for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener('click', function () {
        for (let j = 0; j < buttons.length; j++) {
            buttons[j].style.display = 'none';
        }

        //removendo o hide do container
        setTimeout(function () {
            let container = document.querySelector('#container');
            container.classList.remove('hide');
        }, 300)
    })
}

//Adicionando o evento nas caixas 
for (let i = 0; i < boxes.length; i++) {

    boxes[i].addEventListener("click", function () {
        let elemento = checarElemento(jogador1, jogador2);

        if (boxes[i].childNodes.length == 0) {
            // Clonando o elemento
            let cloneElemento = elemento.cloneNode(true);

            //Inserindo o elemento na caixa
            boxes[i].appendChild(cloneElemento);

            if (jogador1 == jogador2) {
                jogador1++;
            }
            else {
                jogador2++;
            }
            checarVitoria();
        }


    });
}

function checarElemento(jogador1, jogador2) {
    // Definindo o elemento que será inserido
    if (jogador1 == jogador2) {
        return x;
    }
    else {
        return o;
    }
}

function checarVitoria() {
    let b1 = document.querySelector('#block-1')
    let b2 = document.querySelector('#block-2')
    let b3 = document.querySelector('#block-3')
    let b4 = document.querySelector('#block-4')
    let b5 = document.querySelector('#block-5')
    let b6 = document.querySelector('#block-6')
    let b7 = document.querySelector('#block-7')
    let b8 = document.querySelector('#block-8')
    let b9 = document.querySelector('#block-9')

    // verificação horizontal

    if (b1.childNodes.length > 0 && b2.childNodes.length > 0 && b3.childNodes.length > 0) {
        // pegando a class dos elementos dfilhos de b1 b2 b3
        let b1Child = b1.childNodes[0].className;
        let b2Child = b2.childNodes[0].className;
        let b3Child = b3.childNodes[0].className;

        // verificando se x ou o ganhou

        if (b1Child == 'x' && b2Child == 'x' && b3Child == 'x') {
            declararVencedor('x')
        }
        if (b1Child == 'o' && b2Child == 'o' && b3Child == 'o') {
            declararVencedor('o')
        }
    }

    if (b4.childNodes.length > 0 && b5.childNodes.length > 0 && b6.childNodes.length > 0) {
        let b4Child = b4.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b6Child = b6.childNodes[0].className;

        // verificando se x ou o ganhou

        if (b4Child == 'x' && b5Child == 'x' && b6Child == 'x') {
            declararVencedor('x')

        }
        if (b4Child == 'o' && b5Child == 'o' && b6Child == 'o') {
            declararVencedor('o')

        }
    }
    if (b7.childNodes.length > 0 && b8.childNodes.length > 0 && b9.childNodes.length > 0) {
        let b7Child = b7.childNodes[0].className;
        let b8Child = b8.childNodes[0].className;
        let b9Child = b9.childNodes[0].className;

        // verificando se x ou o ganhou

        if (b7Child == 'x' && b8Child == 'x' && b9Child == 'x') {

            declararVencedor('x')
        }
        if (b7Child == 'o' && b8Child == 'o' && b9Child == 'o') {
            declararVencedor('x')
        }
    }

    // verificação vertical

    if (b1.childNodes.length > 0 && b4.childNodes.length > 0 && b7.childNodes.length > 0) {
        let b1Child = b1.childNodes[0].className;
        let b4Child = b4.childNodes[0].className;
        let b7Child = b7.childNodes[0].className;

        // verificando se x ou o ganhou

        if (b1Child == 'x' && b4Child == 'x' && b7Child == 'x') {
            declararVencedor('x')
        }
        if (b1Child == 'o' && b4Child == 'o' && b7Child == 'o') {
            declararVencedor('o')
        }
    }

    if (b2.childNodes.length > 0 && b5.childNodes.length > 0 && b8.childNodes.length > 0) {
        let b2Child = b2.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b8Child = b8.childNodes[0].className;

        // verificando se x ou o ganhou

        if (b2Child == 'x' && b5Child == 'x' && b8Child == 'x') {
            declararVencedor('x')
        }
        if (b2Child == 'o' && b5Child == 'o' && b8Child == 'o') {
            declararVencedor('o')
        }
    }

    if (b3.childNodes.length > 0 && b6.childNodes.length > 0 && b9.childNodes.length > 0) {
        let b3Child = b3.childNodes[0].className;
        let b6Child = b6.childNodes[0].className;
        let b9Child = b9.childNodes[0].className;

        // verificando se x ou o ganhou

        if (b3Child == 'x' && b6Child == 'x' && b9Child == 'x') {
            declararVencedor('x')
        }
        if (b3Child == 'o' && b6Child == 'o' && b9Child == 'o') {
            declararVencedor('o')
        }
    }

    // verificação diagonal

    if (b1.childNodes.length > 0 && b5.childNodes.length > 0 && b9.childNodes.length > 0) {
        let b1Child = b1.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b9Child = b9.childNodes[0].className;

        // verificando se x ou o ganhou

        if (b1Child == 'x' && b5Child == 'x' && b9Child == 'x') {
            declararVencedor('x')
        }
        if (b1Child == 'o' && b5Child == 'o' && b9Child == 'o') {
            declararVencedor('o')
        }
    }

    if (b3.childNodes.length > 0 && b5.childNodes.length > 0 && b7.childNodes.length > 0) {
        let b3Child = b3.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b7Child = b7.childNodes[0].className;

        // verificando se x ou o ganhou

        if (b3Child == 'x' && b5Child == 'x' && b7Child == 'x') {
            declararVencedor('x')
        }
        if (b3Child == 'o' && b5Child == 'o' && b7Child == 'o') {
            declararVencedor('o')
        }
    }

    // condição de empate

    let contador = 0
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].childNodes[0] != undefined) {
            contador++;
        }

    }
    if (contador == 9) {
        declararVencedor('Empatou!')
    }
}

function declararVencedor(vencedor) {
    let placar_x = document.querySelector('#placar-1')
    let placar_o = document.querySelector('#placar-2')
    let msg = ''

    if (vencedor = 'x') {
        placar_x.innerText = Number(placar_x.innerText) + 1
        msg = 'Jogador 1 venceu'
    }

    else if (vencedor == 0) {
        placar_o.innerText = Number(placar_o.innerText) + 1
        msg = 'Jogador 2 venceu'
    }

    else {
        msg = 'Empatou :/'
    }
    //alterando o texto do paragrafo
    textoMensagem.innerHTML = msg
    containerMensagem.classList.remove('hide')

    //removendo a mensagem
    setTimeout(function () {
        containerMensagem.classList.add('hide');
    }, 500);

    // resetando o jogo
    jogador1 = 0
    jogador2 = 0

    let preenchidos = document.querySelectorAll('.box div');
    for (let i = 0; i < preenchidos.length; i++) {
        preenchidos[i].parentNode.removeChild(preenchidos.childNodes[0])
    }



}
