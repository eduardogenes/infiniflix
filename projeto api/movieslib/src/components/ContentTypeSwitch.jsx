import { BiMovie, BiTv } from 'react-icons/bi';
import '../styles/components/ContentTypeSwitch.css';

const ContentTypeSwitch = ({ type, onTypeChange }) => {
    console.log('ContentTypeSwitch rendered:', { type });
    
    return (
        <div className="content-type-switch" role="group" aria-label="Alternar tipo de conteúdo">
            <button
                className={`switch-button ${type === 'movie' ? 'active' : ''}`}
                onClick={() => onTypeChange('movie')}
                aria-pressed={type === 'movie'}
                aria-label="Mostrar filmes"
            >
                <BiMovie /> Filmes
            </button>
            <button
                className={`switch-button ${type === 'tv' ? 'active' : ''}`}
                onClick={() => onTypeChange('tv')}
                aria-pressed={type === 'tv'}
                aria-label="Mostrar séries"
            >
                <BiTv /> Séries
            </button>
        </div>
    );
};

export default ContentTypeSwitch;
