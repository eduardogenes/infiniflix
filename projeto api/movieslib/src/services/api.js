const API_CONFIG = {
    apiKey: import.meta.env.VITE_API_KEY.replace('api_key=', ''),
    baseUrl: import.meta.env.VITE_API,
    imageUrl: import.meta.env.VITE_IMG
};

/**
 * Available categories for movies and TV shows
 * @see https://developer.themoviedb.org/reference/movie-popular
 * @see https://developer.themoviedb.org/reference/tv-series-popular
 */
export const CATEGORIES = {
    MOVIES: {
        TOP_RATED: 'movie/top_rated',
        POPULAR: 'movie/popular',
        NOW_PLAYING: 'movie/now_playing',
        UPCOMING: 'movie/upcoming'
    },
    TV: {
        TOP_RATED: 'tv/top_rated',
        POPULAR: 'tv/popular',
        ON_THE_AIR: 'tv/on_the_air',
        AIRING_TODAY: 'tv/airing_today'
    }
};

/**
 * Available sort options for discover endpoint
 * @see https://developer.themoviedb.org/reference/discover-movie
 * @see https://developer.themoviedb.org/reference/discover-tv
 */
export const SORT_OPTIONS = {
    POPULARITY_DESC: 'popularity.desc',
    POPULARITY_ASC: 'popularity.asc',
    RELEASE_DATE_DESC: 'primary_release_date.desc',
    RELEASE_DATE_ASC: 'primary_release_date.asc',
    FIRST_AIR_DATE_DESC: 'first_air_date.desc',
    FIRST_AIR_DATE_ASC: 'first_air_date.asc',
    VOTE_DESC: 'vote_average.desc',
    VOTE_ASC: 'vote_average.asc'
};

/**
 * Generic fetch handler with error handling
 */
const fetchApi = async (endpoint, additionalParams = {}) => {
    try {
        const params = new URLSearchParams({
            api_key: API_CONFIG.apiKey,
            language: 'pt-BR',
            ...additionalParams
        });

        const url = `${API_CONFIG.baseUrl}${endpoint}?${params}`;
        console.log('Fetching URL:', url);

        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Response:', errorData);
            throw new Error(errorData.status_message || `API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

/**
 * TMDB API service for movies and TV shows
 */
export const tmdbService = {
    /**
     * Fetch content (movies or TV shows) by category with filters
     * @see https://developer.themoviedb.org/reference/discover-movie
     * @see https://developer.themoviedb.org/reference/discover-tv
     */
    getByCategory: async (category, options = {}) => {
        const { page = 1, sortBy, year, genre, type = 'movie' } = options;
        const isTV = type === 'tv';
        
        // Parâmetros base
        const params = {
            page: page.toString(),
            include_adult: false
        };

        // Se for uma categoria específica (não discover)
        if (category.startsWith(type + '/')) {
            // Para categorias específicas, apenas aplicamos ordenação se especificada
            if (sortBy) {
                params.sort_by = sortBy;
            }
            return fetchApi(category, params);
        }

        // Para discover, adicionamos os filtros
        params.sort_by = sortBy || 'popularity.desc';
        params.vote_count = 100;

        if (year) {
            if (isTV) {
                // Para TV, usamos air_date para filtrar por ano
                const yearStart = `${year}-01-01`;
                const yearEnd = `${year}-12-31`;
                params.air_date_gte = yearStart;
                params.air_date_lte = yearEnd;
            } else {
                // Para filmes, usamos release_date
                params.primary_release_year = year;
            }
        }

        if (genre) {
            params.with_genres = genre;
        }

        // Ajusta o endpoint baseado no tipo
        const endpoint = isTV ? 'discover/tv' : 'discover/movie';

        // Ajusta parâmetros específicos para TV
        if (isTV) {
            // Remove parâmetros específicos de filmes se presentes
            delete params.primary_release_year;
            
            // Adiciona parâmetros específicos para TV
            if (category.includes('airing_today')) {
                const today = new Date().toISOString().split('T')[0];
                params.air_date_gte = today;
                params.air_date_lte = today;
            } else if (category.includes('on_the_air')) {
                const today = new Date();
                const nextWeek = new Date(today);
                nextWeek.setDate(today.getDate() + 7);
                params.air_date_gte = today.toISOString().split('T')[0];
                params.air_date_lte = nextWeek.toISOString().split('T')[0];
            }
        }

        return fetchApi(endpoint, params);
    },

    /**
     * Fetch details by ID
     * @see https://developer.themoviedb.org/reference/movie-details
     * @see https://developer.themoviedb.org/reference/tv-series-details
     */
    getById: async (id, type = 'movie') => {
        if (!id) throw new Error('ID is required');
        const response = await fetch(`${API_CONFIG.baseUrl}${type}/${id}?api_key=${API_CONFIG.apiKey}&language=pt-BR&append_to_response=credits,videos`)
        return await response.json()
    },

    /**
     * Search for movies or TV shows
     * @see https://developer.themoviedb.org/reference/search-movie
     * @see https://developer.themoviedb.org/reference/search-tv
     */
    search: async (query, options = {}) => {
        if (!query) throw new Error('Search query is required');

        const { page = 1, type = 'movie' } = options;
        return fetchApi(`search/${type}`, {
            query,
            page: page.toString(),
            include_adult: false
        });
    },

    /**
     * Fetch genres
     * @see https://developer.themoviedb.org/reference/genre-movie-list
     * @see https://developer.themoviedb.org/reference/genre-tv-list
     */
    getGenres: async (type = 'movie') => {
        return fetchApi(`genre/${type}/list`);
    }
};

/**
 * Utility functions
 */
export const utils = {
    getImageUrl: (path) => {
        return path ? `${API_CONFIG.imageUrl}${path}` : null
    },
    formatCurrency: (value) => {
        if (!value || value === 0) return 'Não informado'
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'USD',
        }).format(value)
    },
    formatDate: (dateString) => {
        if (!dateString) return 'Data não informada'
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString().slice(-2)
        return `${day}/${month}/${year}`
    }
};
