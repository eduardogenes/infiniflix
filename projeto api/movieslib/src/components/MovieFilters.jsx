import { useState, useEffect } from 'react'
import { CATEGORIES, SORT_OPTIONS, tmdbService } from '../services/api'
import { FaFilter, FaSort, FaCalendar, FaTheaterMasks } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { BiCategoryAlt } from 'react-icons/bi'
import '../styles/components/Filters.css'

const MovieFilters = ({ onFilterChange, initialFilters = {}, contentType = 'movie' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [genres, setGenres] = useState([])
    const [filters, setFilters] = useState({
        category: initialFilters.category || (contentType === 'movie' ? CATEGORIES.MOVIES.POPULAR : CATEGORIES.TV.POPULAR),
        sortBy: initialFilters.sortBy || '',
        year: initialFilters.year || '',
        genre: initialFilters.genre || ''
    })

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const data = await tmdbService.getGenres(contentType)
                setGenres(data.genres || [])
            } catch (error) {
                console.error('Failed to load genres:', error)
            }
        }
        loadGenres()
    }, [contentType])

    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters, [name]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleReset = () => {
        const defaultFilters = {
            category: contentType === 'movie' ? CATEGORIES.MOVIES.POPULAR : CATEGORIES.TV.POPULAR,
            sortBy: '',
            year: '',
            genre: ''
        }
        setFilters(defaultFilters)
        onFilterChange(defaultFilters)
    }

    // Generate year options (from 1900 to current year)
    const currentYear = new Date().getFullYear()
    const years = Array.from(
        { length: currentYear - 1900 + 1 },
        (_, i) => currentYear - i
    )

    return (
        <>
            <button 
                className={`filters-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Fechar filtros" : "Abrir filtros"}
                aria-expanded={isOpen}
            >
                {isOpen ? <IoMdClose /> : <FaFilter />}
                <span className="toggle-text">{isOpen ? 'Fechar' : 'Filtros'}</span>
            </button>

            <div className={`filters-container ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
                <div className="filters-header">
                    <h2><FaFilter /> Filtros</h2>
                    <button 
                        className="close-button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Fechar menu de filtros"
                    >
                        <IoMdClose />
                    </button>
                </div>

                <div className="filters-content">
                    <div className="filters-section">
                        <h3><BiCategoryAlt /> Categoria</h3>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            aria-label="Selecionar categoria"
                        >
                            {contentType === 'movie' ? (
                                <>
                                    <option value={CATEGORIES.MOVIES.POPULAR}>Populares</option>
                                    <option value={CATEGORIES.MOVIES.TOP_RATED}>Mais Votados</option>
                                    <option value={CATEGORIES.MOVIES.NOW_PLAYING}>Em Cartaz</option>
                                    <option value={CATEGORIES.MOVIES.UPCOMING}>Em Breve</option>
                                </>
                            ) : (
                                <>
                                    <option value={CATEGORIES.TV.POPULAR}>Populares</option>
                                    <option value={CATEGORIES.TV.TOP_RATED}>Mais Votados</option>
                                    <option value={CATEGORIES.TV.ON_THE_AIR}>No Ar</option>
                                    <option value={CATEGORIES.TV.AIRING_TODAY}>Hoje</option>
                                </>
                            )}
                        </select>
                    </div>

                    <div className="filters-section">
                        <h3><FaSort /> Ordenar por</h3>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            aria-label="Ordenar por"
                        >
                            <option value="">Padrão</option>
                            <option value={SORT_OPTIONS.POPULARITY_DESC}>Popularidade ↓</option>
                            <option value={SORT_OPTIONS.POPULARITY_ASC}>Popularidade ↑</option>
                            <option value={SORT_OPTIONS.VOTE_DESC}>Avaliação ↓</option>
                            <option value={SORT_OPTIONS.VOTE_ASC}>Avaliação ↑</option>
                            {contentType === 'movie' ? (
                                <>
                                    <option value={SORT_OPTIONS.RELEASE_DATE_DESC}>Data de Lançamento ↓</option>
                                    <option value={SORT_OPTIONS.RELEASE_DATE_ASC}>Data de Lançamento ↑</option>
                                </>
                            ) : (
                                <>
                                    <option value={SORT_OPTIONS.FIRST_AIR_DATE_DESC}>Data de Estreia ↓</option>
                                    <option value={SORT_OPTIONS.FIRST_AIR_DATE_ASC}>Data de Estreia ↑</option>
                                </>
                            )}
                        </select>
                    </div>

                    <div className="filters-section">
                        <h3><FaCalendar /> Ano</h3>
                        <select
                            value={filters.year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            aria-label="Filtrar por ano"
                        >
                            <option value="">Todos os anos</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filters-section">
                        <h3><FaTheaterMasks /> Gênero</h3>
                        <select
                            value={filters.genre}
                            onChange={(e) => handleFilterChange('genre', e.target.value)}
                            aria-label="Filtrar por gênero"
                        >
                            <option value="">Todos os gêneros</option>
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button 
                    className="reset-button mobile-reset"
                    onClick={handleReset}
                    aria-label="Resetar todos os filtros"
                >
                    Resetar Filtros
                </button>
            </div>
        </>
    )
}

export default MovieFilters
