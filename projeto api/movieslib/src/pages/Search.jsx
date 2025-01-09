import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { tmdbService } from "../services/api"
import MovieCard from "../components/MovieCard"
import MovieFilters from "../components/MovieFilters"
import ContentTypeSwitch from "../components/ContentTypeSwitch"
import '../styles/pages/MovieGrid.css'

const Search = () => {
    const [searchParams] = useSearchParams()
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [contentType, setContentType] = useState('movie')

    const query = searchParams.get("q") || ""
    const filters = {
        year: searchParams.get("year") || "",
        genre: searchParams.get("genre") || ""
    }

    const searchContent = useCallback(async () => {
        if (!query) {
            setContent([])
            return
        }

        try {
            setLoading(true)
            setError(null)
            setContent([]) // Limpa os resultados anteriores

            const data = await tmdbService.search(query, {
                ...filters,
                type: contentType
            })
            
            if (!data?.results) {
                throw new Error('Resposta inválida do servidor')
            }

            setContent(data.results)
        } catch (err) {
            console.error('Error searching content:', err)
            setError(err.message || 'Falha ao buscar conteúdo. Por favor, tente novamente.')
            setContent([])
        } finally {
            setLoading(false)
        }
    }, [query, filters.year, filters.genre, contentType])

    useEffect(() => {
        const timer = setTimeout(() => {
            searchContent()
        }, 300) // Pequeno debounce para evitar múltiplas chamadas

        return () => clearTimeout(timer)
    }, [searchContent])

    const handleFilterChange = useCallback((newFilters) => {
        const params = new URLSearchParams(searchParams)
        if (newFilters.year) params.set("year", newFilters.year)
        else params.delete("year")
        if (newFilters.genre) params.set("genre", newFilters.genre)
        else params.delete("genre")
        window.history.pushState({}, '', `?${params.toString()}`)
    }, [searchParams])

    const handleTypeChange = useCallback((newType) => {
        setContentType(newType)
    }, [])

    return (
        <div className="container">
            <h2 className="title">
                Resultados para: <span className="query-text">{query}</span>
            </h2>

            <ContentTypeSwitch 
                type={contentType} 
                onTypeChange={handleTypeChange} 
            />

            <MovieFilters
                onFilterChange={handleFilterChange}
                initialFilters={filters}
                contentType={contentType}
            />

            <div className="movies-container">
                {loading && content.length === 0 && (
                    <div className="loading">
                        <h3>Carregando resultados...</h3>
                    </div>
                )}

                {error && (
                    <div className="error">
                        <h3>Erro</h3>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && content.length === 0 && query && (
                    <div className="no-results">
                        <h3>Nenhum resultado encontrado</h3>
                        <p>Tente mudar os filtros ou fazer uma nova busca</p>
                    </div>
                )}

                {content.map((item, index) => (
                    <MovieCard
                        key={`${item.id}-${contentType}`}
                        movie={item}
                        type={contentType}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default Search