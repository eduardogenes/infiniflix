import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { tmdbService, utils } from "../services/api"
import { 
    BsGraphUp, 
    BsWallet2, 
    BsHourglassSplit, 
    BsFillFileEarmarkTextFill,
    BsCalendarDate,
    BsStar,
    BsPeople,
    BsArrowLeft
} from "react-icons/bs"
import '../styles/pages/Movie.css'

const Movie = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchMovie = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await tmdbService.getById(id, 'movie')
                setMovie(data)
            } catch (err) {
                console.error('Error fetching movie:', err)
                setError(err.message || 'Falha ao carregar os detalhes do filme. Por favor, tente novamente.')
            } finally {
                setLoading(false)
            }
        }

        fetchMovie()
    }, [id])

    if (loading) {
        return (
            <div className="movie-page loading">
                <div className="loading-content">
                    <div className="skeleton poster"></div>
                    <div className="skeleton-details">
                        <div className="skeleton title"></div>
                        <div className="skeleton tagline"></div>
                        <div className="skeleton text"></div>
                        <div className="skeleton text"></div>
                        <div className="skeleton text"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="movie-page">
                <div className="error">
                    <h2 className="title">Erro</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Tentar Novamente
                    </button>
                </div>
            </div>
        )
    }

    if (!movie) return null

    const backdropStyle = {
        backgroundImage: movie.backdrop_path 
            ? `url(${utils.getImageUrl(movie.backdrop_path)})`
            : 'none'
    }

    return (
        <div className="movie-page">
            <div className="backdrop" style={backdropStyle}></div>
            <button className="back-button" onClick={() => navigate(-1)}>
                <BsArrowLeft /> Voltar
            </button>
            <div className="movie-content">
                <div className="movie-poster">
                    {utils.getImageUrl(movie.poster_path) ? (
                        <img 
                            src={utils.getImageUrl(movie.poster_path)} 
                            alt={movie.title}
                            loading="lazy"
                        />
                    ) : (
                        <div className="no-image">
                            <span>Imagem não disponível</span>
                        </div>
                    )}
                </div>

                <div className="movie-details">
                    <h1 className="title">{movie.title}</h1>
                    {movie.tagline && (
                        <p className="tagline">"{movie.tagline}"</p>
                    )}

                    <div className="quick-info">
                        <div className="info-item">
                            <BsCalendarDate />
                            <span>{utils.formatDate(movie.release_date)}</span>
                        </div>
                        <div className="info-item">
                            <BsStar />
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                        <div className="info-item">
                            <BsPeople />
                            <span>{movie.vote_count.toLocaleString()} votos</span>
                        </div>
                    </div>

                    <div className="genres">
                        {movie.genres?.map(genre => (
                            <span key={genre.id} className="genre">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="info description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Sinopse
                        </h3>
                        <p>{movie.overview || "Sinopse não disponível."}</p>
                    </div>

                    <div className="stats">
                        <div className="stat-item">
                            <h3>
                                <BsHourglassSplit /> Duração
                            </h3>
                            <p>{movie.runtime} minutos</p>
                        </div>

                        <div className="stat-item">
                            <h3>
                                <BsWallet2 /> Orçamento
                            </h3>
                            <p>{utils.formatCurrency(movie.budget)}</p>
                        </div>

                        <div className="stat-item">
                            <h3>
                                <BsGraphUp /> Receita
                            </h3>
                            <p>{utils.formatCurrency(movie.revenue)}</p>
                        </div>
                    </div>

                    {movie.credits?.cast && (
                        <div className="cast">
                            <h3>Elenco Principal</h3>
                            <div className="cast-list">
                                {movie.credits.cast.slice(0, 5).map(actor => (
                                    <div key={actor.id} className="cast-item">
                                        {actor.profile_path ? (
                                            <img 
                                                src={utils.getImageUrl(actor.profile_path)} 
                                                alt={actor.name}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="no-photo">
                                                {actor.name.charAt(0)}
                                            </div>
                                        )}
                                        <p className="actor-name">{actor.name}</p>
                                        <p className="character-name">{actor.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {movie.videos?.results && movie.videos.results.length > 0 && (
                        <div className="videos">
                            <h3>Trailer</h3>
                            <div className="video-container">
                                <iframe
                                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                                    title="Trailer"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Movie