import { Link } from "react-router-dom"
import { FaStar } from 'react-icons/fa'
import { utils } from '../services/api'
import '../styles/components/MovieCard.css'

const MovieCard = ({ movie }) => {
    const imageUrl = utils.getImageUrl(movie.poster_path);

    return (
        <div className="movie-card">
            {imageUrl ? (
                <img src={imageUrl} alt={movie.title} />
            ) : (
                <div className="no-image">No image available</div>
            )}
            <h2>{movie.title}</h2>
            <p>
                <FaStar /> {movie.vote_average}
            </p>
            <Link to={`/movie/${movie.id}`}>Detalhes</Link>
        </div>
    )
}

export default MovieCard