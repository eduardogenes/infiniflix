import { useState, useEffect, useRef, useCallback } from "react"
import { tmdbService, CATEGORIES } from "../services/api"
import MovieCard from "../components/MovieCard"
import MovieFilters from "../components/MovieFilters"
import ContentTypeSwitch from "../components/ContentTypeSwitch"
import '../styles/pages/MovieGrid.css'

const SKELETON_COUNT = 8
const INTERSECTION_OPTIONS = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1
}

const Home = () => {
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [contentType, setContentType] = useState('movie')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef()
    const loadingRef = useRef(false)
    const [filters, setFilters] = useState({
        category: contentType === 'movie' ? CATEGORIES.MOVIES.POPULAR : CATEGORIES.TV.POPULAR,
        sortBy: '',
        year: '',
        genre: ''
    })

    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            category: contentType === 'movie' ? CATEGORIES.MOVIES.POPULAR : CATEGORIES.TV.POPULAR
        }))
        setContent([])
        setPage(1)
        setHasMore(true)
        window.scrollTo(0, 0)
    }, [contentType])

    const fetchContent = async (pageNumber) => {
        if (loadingRef.current) return
        
        try {
            loadingRef.current = true
            setLoading(true)
            setError(null)
            
            const data = await tmdbService.getByCategory(filters.category, {
                sortBy: filters.sortBy || undefined,
                year: filters.year || undefined,
                genre: filters.genre || undefined,
                type: contentType,
                page: pageNumber
            })
            
            if (!data?.results) {
                throw new Error('Resposta inválida do servidor')
            }

            setContent(prev => {
                if (pageNumber === 1) return data.results
                return [...new Set([...prev, ...data.results].map(item => JSON.stringify(item)))].map(item => JSON.parse(item))
            })
            setHasMore(data.page < data.total_pages)
        } catch (err) {
            console.error('Error fetching content:', err)
            setError(err.message || 'Falha ao carregar o conteúdo. Por favor, tente novamente.')
        } finally {
            setLoading(false)
            loadingRef.current = false
        }
    }

    useEffect(() => {
        setContent([])
        setPage(1)
        setHasMore(true)
        setLoading(true)
        window.scrollTo(0, 0)
        fetchContent(1)
    }, [filters])

    const lastElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
                setPage(prevPage => prevPage + 1)
            }
        }, INTERSECTION_OPTIONS)
        
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        if (page > 1) {
            fetchContent(page)
        }
    }, [page])

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }

    const handleTypeChange = (newType) => {
        setContentType(newType)
    }

    const handleRetry = () => {
        setError(null)
        setPage(1)
        fetchContent(1)
    }

    const renderContent = () => {
        if (error) {
            return (
                <div className="error-container" role="alert">
                    <h2 className="error-title">Ops! Algo deu errado</h2>
                    <p className="error-message">{error}</p>
                    <button 
                        onClick={handleRetry}
                        className="retry-button"
                    >
                        Tentar Novamente
                    </button>
                </div>
            )
        }

        if (content.length === 0 && !loading) {
            return (
                <div className="no-results" role="status">
                    <h2>Nenhum resultado encontrado</h2>
                    <p>Tente ajustar seus filtros ou fazer uma nova busca.</p>
                </div>
            )
        }

        return (
            <div 
                className="movies-container"
                role="grid"
                aria-label={`Grade de ${contentType === 'movie' ? 'filmes' : 'séries'}`}
            >
                {content.map((item, index) => (
                    <MovieCard 
                        key={`${item.id}-${index}`}
                        movie={item} 
                        type={contentType}
                        index={index}
                        ref={index === content.length - 1 ? lastElementRef : null}
                    />
                ))}
                {loading && (
                    <>
                        {[...Array(SKELETON_COUNT)].map((_, index) => (
                            <div 
                                key={`skeleton-${index}`}
                                className="skeleton-card"
                                role="presentation"
                                aria-hidden="true"
                            />
                        ))}
                    </>
                )}
            </div>
        )
    }

    return (
        <div className="page-container">
            <div className="switch-container">
                <ContentTypeSwitch 
                    type={contentType} 
                    onTypeChange={handleTypeChange} 
                />
            </div>
            
            <div className="container">
                <MovieFilters 
                    onFilterChange={handleFilterChange} 
                    initialFilters={filters}
                    contentType={contentType}
                />

                {renderContent()}
            </div>
        </div>
    )
}

export default Home