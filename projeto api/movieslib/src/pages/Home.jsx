import { useState, useEffect } from "react"
import { movieService } from "../services/api"
import MovieCard from "../components/MovieCard"
import '../styles/pages/MovieGrid.css'

const Home = () => {
    const [topMovies, setTopMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTopMovies = async () => {
            try {
                setLoading(true)
                const data = await movieService.getTopRated()
                setTopMovies(data.results)
            } catch (err) {
                setError('Failed to load top rated movies')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchTopMovies()
    }, [])

    if (loading) return <div className="container"><h2 className="title">Carregando...</h2></div>
    if (error) return <div className="container"><h2 className="title">{error}</h2></div>

    return (
        <div className="container">
            <h2 className="title">Melhores filmes:</h2>
            <div className="movies-container">
                {topMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Home