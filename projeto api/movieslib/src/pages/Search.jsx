import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { movieService } from "../services/api"
import MovieCard from "../components/MovieCard"
import '../styles/pages/MovieGrid.css'

const Search = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const searchMovies = async () => {
            if (!query) return

            try {
                setLoading(true)
                const data = await movieService.search(query)
                setMovies(data.results)
            } catch (err) {
                setError('Failed to search movies')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        searchMovies()
    }, [query])

    if (loading) return <div className="container"><h2 className="title">Carregando...</h2></div>
    if (error) return <div className="container"><h2 className="title">{error}</h2></div>

    return (
        <div className="container">
            <h2 className="title">
                Resultados para: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
                {movies.length === 0 && (
                    <p>Nenhum filme encontrado para: {query}</p>
                )}
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Search