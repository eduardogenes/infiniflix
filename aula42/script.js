
//pegando o display
const resultado = document.querySelector('#resultado')


// pegando os numeros e o decimal
const limpar= document.querySelector('#limpar')
const zero= document.querySelector('#zero')
const um= document.querySelector('#um')
const dois= document.querySelector('#dois')
const tres= document.querySelector('#tres')
const quatro= document.querySelector('#quatro')
const cinco= document.querySelector('#cinco')
const seis= document.querySelector('#seis')
const sete= document.querySelector('#sete')
const oito= document.querySelector('#oito')
const nove= document.querySelector('#nove')
const decimal= document.querySelector('#decimal')

//pegando os operadores e o igual
const somar= document.querySelector('#somar')
const subtrair= document.querySelector('#subtrair')
const dividir= document.querySelector('#dividir')
const multiplicar= document.querySelector('#multiplicar')
const igual= document.querySelector('#igual')



//adicionadno os eventos no botao

zero.addEventListener('click', function(){
    resultado.value += '0'
})
um.addEventListener('click', function(){
    resultado.value += '1'
})
dois.addEventListener('click', function(){
    resultado.value += '2'
})
tres.addEventListener('click', function(){
    resultado.value += '3'
})
quatro.addEventListener('click', function(){
    resultado.value += '4'
})
cinco.addEventListener('click', function(){
    resultado.value += '5'
})
seis.addEventListener('click', function(){
    resultado.value += '6'
})

sete.addEventListener('click', function(){
    resultado.value += '7'
})
oito.addEventListener('click', function(){
    resultado.value += '8'
})
nove.addEventListener('click', function(){
    resultado.value += '9'
})
somar.addEventListener('click', function(){
    resultado.value += '+'
})
subtrair.addEventListener('click', function(){
    resultado.value += '-'
})

dividir.addEventListener('click', function(){
    resultado.value += '/'
})
multiplicar.addEventListener('click', function(){
    resultado.value += '*'
})

decimal.addEventListener('click', function(){
    resultado.value += '.'
})

limpar.addEventListener('click', function(){
    resultado.value = ''
})

igual.addEventListener('click', function(){
    resultado.value = eval(resultado.value)
})