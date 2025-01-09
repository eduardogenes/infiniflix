import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { tmdbService, utils } from "../services/api"
import { 
    BsGraphUp, 
    BsWallet2, 
    BsHourglassSplit, 
    BsFillFileEarmarkTextFill,
    BsCalendarDate,
    BsStar,
    BsPeople,
    BsTv
} from "react-icons/bs"
import '../styles/pages/Series.css'

const Series = () => {
    const { id } = useParams()
    const [series, setSeries] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await tmdbService.getById(id, 'tv')
                setSeries(data)
            } catch (err) {
                console.error('Error fetching series:', err)
                setError(err.message || 'Falha ao carregar os detalhes da série. Por favor, tente novamente.')
            } finally {
                setLoading(false)
            }
        }

        fetchSeries()
    }, [id])

    if (loading) {
        return (
            <div className="series-page loading">
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
            <div className="series-page">
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

    if (!series) return null

    const backdropStyle = {
        backgroundImage: series.backdrop_path 
            ? `url(${utils.getImageUrl(series.backdrop_path)})`
            : 'none'
    }

    return (
        <div className="series-page">
            <div className="backdrop" style={backdropStyle}></div>
            <div className="series-content">
                <div className="series-poster">
                    {utils.getImageUrl(series.poster_path) ? (
                        <img 
                            src={utils.getImageUrl(series.poster_path)} 
                            alt={`Pôster de ${series.name}`} 
                            loading="lazy"
                        />
                    ) : (
                        <div className="no-image">
                            <span>Imagem não disponível</span>
                        </div>
                    )}
                </div>

                <div className="series-details">
                    <h1 className="title">{series.name}</h1>
                    {series.tagline && (
                        <p className="tagline">"{series.tagline}"</p>
                    )}

                    <div className="quick-info">
                        <div className="info-item">
                            <BsCalendarDate />
                            <span>{utils.formatDate(series.first_air_date)}</span>
                        </div>
                        <div className="info-item">
                            <BsStar />
                            <span>{series.vote_average?.toFixed(1)}</span>
                        </div>
                        <div className="info-item">
                            <BsPeople />
                            <span>{series.vote_count?.toLocaleString()} votos</span>
                        </div>
                        <div className="info-item">
                            <BsTv />
                            <span>{series.number_of_seasons} temporada{series.number_of_seasons !== 1 ? 's' : ''}</span>
                        </div>
                    </div>

                    <div className="genres">
                        {series.genres?.map(genre => (
                            <span key={genre.id} className="genre">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="info description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Sinopse
                        </h3>
                        <p>{series.overview || "Sinopse não disponível."}</p>
                    </div>

                    <div className="stats">
                        <div className="stat-item">
                            <h3>
                                <BsHourglassSplit /> Episódios
                            </h3>
                            <p>{series.number_of_episodes} episódios</p>
                        </div>

                        <div className="stat-item">
                            <h3>
                                <BsWallet2 /> Status
                            </h3>
                            <p>{series.status === 'Ended' ? 'Finalizada' : 'Em exibição'}</p>
                        </div>

                        <div className="stat-item">
                            <h3>
                                <BsGraphUp /> Popularidade
                            </h3>
                            <p>{Math.round(series.popularity)} pontos</p>
                        </div>
                    </div>

                    {series.credits?.cast && (
                        <div className="cast">
                            <h3>Elenco Principal</h3>
                            <div className="cast-list">
                                {series.credits.cast.slice(0, 5).map(actor => (
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

                    {series.videos?.results && series.videos.results.length > 0 && (
                        <div className="videos">
                            <h3>Trailer</h3>
                            <div className="video-container">
                                <iframe
                                    src={`https://www.youtube.com/embed/${series.videos.results[0].key}`}
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

export default Series
