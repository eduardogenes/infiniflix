import { useState, useEff, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import './MovieGrid.css';


const movieURL= import.meta.env.VITE_API
const apiKey= import.meta.env.VITE_API_KEY

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
  }

  useEffect(() => {
    // criando a URL de requisição
    const url = `${movieURL}top_rated?${apiKey}`;

    getTopMovies(url);

  }, [])

  return (
    <div className="container">
      <h2 className="title">
        Melhores Filmes
      </h2>
      <div className="movies-container">
        {topMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/> )}
      </div>
    </div>
  )
}

export default Home