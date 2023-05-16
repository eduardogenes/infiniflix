import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
 } from "react-icons/bs";
import MovieCard from '../components/MovieCard';
import './Movie.css'

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;



const Movie = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    setMovie(data)
  }

  useEffect(() => {
    const url = `${movieURL}${id}?${apiKey}`
    getMovie(url);
  },[])

  const formatarValor = (valor) => {
    return valor.toLocaleString("en-us", {
      style: 'currency',
      currency: 'USD'
    });
  }

  return (
    <div className="movie-page">
      {movie && (
        <>
        <MovieCard movie={movie} showLink={false}/>
        <div className="info">
          <h3>
            <BsWallet2/> Orçamento:
          </h3>
          <p>
            {formatarValor(movie.budget)}
          </p>
        </div>
        <div className="info">
          <h3>
            <BsGraphUp/> Receita:

          </h3>
          <p>
            {formatarValor( movie.revenue)}
          </p>
        </div>
        <div className="info">
          <h3>
            <BsHourglassSplit/> Duração:

          </h3>
          <p>
            {movie.runtime} minutos
          </p>
        </div>
        <div className="info">
          <h3>
            <BsFillFileEarmarkTextFill/> Descrição:

          </h3>
          <p>
            {movie.overview}
          </p>
        </div>
        </>
      )}
    </div>
  )
}

export default Movie