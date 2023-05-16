const AteLogo = ({nome, curso, nota}) => {
    return (
        <div>
            <h1>Até logo, {nome}!</h1>
            <p>Voce concluiu o curso de {curso}</p>
            <p>Sua nota final foi: {nota}</p>
            <p>Esperamos vê-lo em breve!! 🗼</p>
        </div>
    )
}

export default AteLogo;