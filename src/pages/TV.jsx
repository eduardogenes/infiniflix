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
    BsTv,
    BsArrowLeft
} from "react-icons/bs"
import MovieCard from "../components/MovieCard"
import '../styles/pages/TV.css'

const TV = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [tv, setTv] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchTv = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await tmdbService.getById(id, 'tv')
                setTv(data)
            } catch (err) {
                console.error('Error fetching TV show:', err)
                setError(err.message || 'Falha ao carregar os detalhes da série. Por favor, tente novamente.')
            } finally {
                setLoading(false)
            }
        }

        fetchTv()
    }, [id])

    if (loading) {
        return (
            <div className="tv-page loading">
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
            <div className="tv-page">
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

    if (!tv) return null

    const backdropStyle = {
        backgroundImage: tv.backdrop_path 
            ? `url(${utils.getImageUrl(tv.backdrop_path)})`
            : 'none'
    }

    return (
        <div className="tv-page">
            <div className="backdrop" style={backdropStyle}></div>
            <button className="back-button" onClick={() => navigate(-1)}>
                <BsArrowLeft /> Voltar
            </button>
            <div className="tv-content">
                <div className="tv-poster">
                    {utils.getImageUrl(tv.poster_path) ? (
                        <img 
                            src={utils.getImageUrl(tv.poster_path)} 
                            alt={`Pôster de ${tv.name}`} 
                            loading="lazy"
                        />
                    ) : (
                        <div className="no-image">
                            <span>Imagem não disponível</span>
                        </div>
                    )}
                </div>

                <div className="tv-details">
                    <h1 className="title">{tv.name}</h1>
                    {tv.tagline && (
                        <p className="tagline">"{tv.tagline}"</p>
                    )}

                    <div className="quick-info">
                        <div className="info-item">
                            <BsCalendarDate />
                            <span>{utils.formatDate(tv.first_air_date)}</span>
                        </div>
                        <div className="info-item">
                            <BsStar />
                            <span>{tv.vote_average?.toFixed(1)}</span>
                        </div>
                        <div className="info-item">
                            <BsPeople />
                            <span>{tv.vote_count?.toLocaleString()} votos</span>
                        </div>
                        <div className="info-item">
                            <BsTv />
                            <span>{tv.number_of_seasons} temporada{tv.number_of_seasons !== 1 ? 's' : ''}</span>
                        </div>
                    </div>

                    <div className="genres">
                        {tv.genres?.map(genre => (
                            <span key={genre.id} className="genre">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="info description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Sinopse
                        </h3>
                        <p>{tv.overview || "Sinopse não disponível."}</p>
                    </div>

                    <div className="stats">
                        <div className="stat-item">
                            <h3>
                                <BsHourglassSplit /> Episódios
                            </h3>
                            <p>{tv.number_of_episodes} episódios</p>
                        </div>

                        <div className="stat-item">
                            <h3>
                                <BsWallet2 /> Status
                            </h3>
                            <p>{tv.status === 'Ended' ? 'Finalizada' : 'Em exibição'}</p>
                        </div>

                        <div className="stat-item">
                            <h3>
                                <BsGraphUp /> Popularidade
                            </h3>
                            <p>{Math.round(tv.popularity)} pontos</p>
                        </div>
                    </div>

                    {tv.credits?.cast && (
                        <div className="cast">
                            <h3>Elenco Principal</h3>
                            <div className="cast-list">
                                {tv.credits.cast.slice(0, 5).map(actor => (
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

                    {tv.videos?.results && tv.videos.results.length > 0 && (
                        <div className="videos">
                            <h3>Trailer</h3>
                            <div className="video-container">
                                <iframe
                                    src={`https://www.youtube.com/embed/${tv.videos.results[0].key}`}
                                    title="Trailer"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {tv.similar?.results?.length > 0 && (
                        <div className="similar-shows">
                            <h3>Séries Similares</h3>
                            <div className="similar-grid">
                                {tv.similar.results
                                    .slice(0, 6)
                                    .map(item => (
                                        <MovieCard key={item.id} movie={item} type="tv" />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TV
