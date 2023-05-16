
// atalho -> rafce
import React from 'react'

import { useEffect, useState } from "react";

const Revisao = () => {

   const[valor, setValor] = useState(0);
   const[valor2, setValor2] = useState(0);
    

    // criando useEffect 
    // sem array de dependencias = vai executar sempre que o componente for renderizado
    useEffect(() => {
        console.log("invocando o useEffect");
    
    });
    
    // criando useEffect 
    // com array de dependencia vazio = executa uma unica vez
    useEffect(() => {
      console.log('so executa uma vez! ');
    }, [])

    // criando useEffect 
    // com array de dependencia preenchido  = so executa quando algo dentro da array for alterada
    useEffect(() => {
      console.log('so executa quando o valor 2 for alterado ');
    }, [valor2])



  return (
    <div>
        <h1>relembrando o useEffect</h1>
        <button onClick={() => setValor(valor + 1 )}>clique aqui</button> 
        <button onClick={() => setValor(valor2 + 1)}>valor 2</button>
    </div>  
  )
}

export default Revisao