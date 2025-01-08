import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { 
    BsGraphUp, 
    BsWallet2, 
    BsHourglassSplit, 
    BsFillFileEarmarkTextFill 
} from "react-icons/bs"
import { movieService, utils } from '../services/api'
import '../styles/pages/Movie.css'

const Movie = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true)
                const data = await movieService.getById(id)
                setMovie(data)
            } catch (err) {
                setError('Failed to load movie details')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchMovie()
    }, [id])

    if (loading) return <div className="movie-page"><h2>Carregando...</h2></div>
    if (error) return <div className="movie-page"><h2>{error}</h2></div>
    if (!movie) return null

    return (
        <div className="movie-page">
            <div className="movie-card">
                <img src={utils.getImageUrl(movie.poster_path)} alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>
                    <BsWallet2 /> Orçamento: {utils.formatCurrency(movie.budget)}
                </p>
                <p>
                    <BsGraphUp /> Receita: {utils.formatCurrency(movie.revenue)}
                </p>
                <p>
                    <BsHourglassSplit /> Duração: {movie.runtime} minutos
                </p>
                {movie.tagline && (
                    <div className="tagline">{movie.tagline}</div>
                )}
                <div className="info description">
                    <h3>
                        <BsFillFileEarmarkTextFill /> Descrição:
                    </h3>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default Movie