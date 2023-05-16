


const BemVindo = (props) => {
    return (
        <div>
            <h1>Seja Bem vindo, {props.nome}</h1>
            <p>Aproveite os beneficios do seu cadastro!</p>
            <p>Matricula: {props.matricula}</p>
            <p>curso: {props.curso}</p>
            <p>nota: {props.nota}</p>
            <button onClick={props.evento}>
                Clique aqui BemVindo
                </button>
        </div>
    )
}

export default BemVindo;