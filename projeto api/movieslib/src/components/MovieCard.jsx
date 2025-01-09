import { forwardRef } from 'react'
import { Link } from "react-router-dom"
import { utils } from "../services/api"
import { FaStar, FaCalendarAlt } from "react-icons/fa"
import { useEffect, useRef } from "react"
import '../styles/components/MovieCard.css'

const MovieCard = forwardRef(({ movie, type = 'movie', index }, ref) => {
    const imageUrl = utils.getImageUrl(movie.poster_path)
    const releaseDate = type === 'movie' ? movie.release_date : movie.first_air_date
    const title = type === 'movie' ? movie.title : movie.name
    const voteAverage = movie.vote_average?.toFixed(1) || '?'
    const rating = voteAverage === '?' ? 'Sem avaliação' : `${voteAverage} de 10`
    const cardRef = useRef(null)

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.animationDelay = `${index * 0.1}s`
        }
    }, [index])
    
    return (
        <div 
            className="card-container"
            ref={ref}
            style={{
                '--animation-order': index % 20
            }}
        >
            <Link 
                to={`/${type}/${movie.id}`}
                className="movie-card-link"
                aria-label={`Ver detalhes de ${title}`}
            >
                <article 
                    ref={cardRef}
                    className="movie-card"
                    aria-labelledby={`title-${movie.id}`}
                >
                    {imageUrl ? (
                        <div className="image-wrapper">
                            <img 
                                src={imageUrl} 
                                alt={`Pôster de ${title}`} 
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.parentNode.replaceChild(
                                        Object.assign(document.createElement('div'), {
                                            className: 'no-image',
                                            textContent: 'Imagem não disponível',
                                            role: 'img',
                                            'aria-label': `Pôster não disponível para ${title}`
                                        }),
                                        e.target
                                    )
                                }}
                            />
                        </div>
                    ) : (
                        <div 
                            className="no-image"
                            role="img"
                            aria-label={`Pôster não disponível para ${title}`}
                        >
                            Imagem não disponível
                        </div>
                    )}
                    
                    <h2 id={`title-${movie.id}`}>{title}</h2>
                    
                    <div className="info-container" aria-label="Informações do título">
                        <table className="info-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="info-item" title={`Avaliação: ${rating}`}>
                                            <FaStar aria-hidden="true" /> 
                                            <span aria-label={`Avaliação: ${rating}`}>
                                                {voteAverage}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="info-item" title={`Data de ${type === 'movie' ? 'lançamento' : 'estreia'}: ${utils.formatDate(releaseDate)}`}>
                                            <FaCalendarAlt aria-hidden="true" /> 
                                            <span aria-label={`${type === 'movie' ? 'Lançado' : 'Estreou'} em ${utils.formatDate(releaseDate)}`}>
                                                {utils.formatDate(releaseDate)}
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="details-button">
                        Ver Detalhes
                    </div>
                </article>
            </Link>
        </div>
    )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard