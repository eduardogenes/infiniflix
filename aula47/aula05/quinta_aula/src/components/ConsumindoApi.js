import { useState, useEffect } from 'react';

const ConsumindoApi = () => {

    const [id, setId] = useState(1);  
    const [data, setData] = useState([]);
    const url = `https://jsonplaceholder.typicode.com/todos/${id}`;

    useEffect(() => {
      const fetchData = async () => {
          const resposta = await fetch(url);
          const dados = await resposta.json();
          setData(dados);
      }
      fetchData();
    }, [id]);
    console.log(data);

    return (
      <div>
          <hr />
          <h1>Dados da API</h1>
          {/* {data.map((dado) => (
              <div key={dado.id}>
                  <p>Id: {dado.id}</p>
                  <p>Title: {dado.title}</p>
              </div>
          ))} */}


        <div>
                <p>Id: {data.id}</p>
                <p>Title: {data.title}</p>
            </div>
            <form>
                <label>
                    Id:
                    <input type="number" onChange={(e) => setId(e.target.value)} />
                </label>
                <input type="submit" value="Buscar" />
            </form>

      </div>
    );
};

export default ConsumindoApi;