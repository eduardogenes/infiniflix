/**
 * API configuration and environment variables
 */
const API_CONFIG = {
    key: import.meta.env.VITE_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3',
    imageUrl: import.meta.env.VITE_IMG
};

/**
 * Generic fetch handler with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - JSON response
 */
const fetchApi = async (endpoint, options = {}) => {
    try {
        const url = `${API_CONFIG.baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}${API_CONFIG.key}`;
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error: ${error.message}`);
        throw error;
    }
};

/**
 * Movie API service
 */
export const movieService = {
    /**
     * Fetch top rated movies
     * @param {number} page - Page number for pagination
     * @returns {Promise<Object>} Movie list response
     */
    getTopRated: (page = 1) => 
        fetchApi(`/movie/top_rated?page=${page}`),

    /**
     * Fetch movie details by ID
     * @param {string|number} id - Movie ID
     * @returns {Promise<Object>} Movie details
     */
    getById: (id) => 
        fetchApi(`/movie/${id}`),

    /**
     * Search movies by query
     * @param {string} query - Search query
     * @param {number} page - Page number for pagination
     * @returns {Promise<Object>} Search results
     */
    search: (query, page = 1) => 
        fetchApi(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`)
};

/**
 * Utility functions
 */
export const utils = {
    /**
     * Get full image URL from path
     * @param {string} path - Image path
     * @returns {string} Complete image URL
     */
    getImageUrl: (path) => path ? `${API_CONFIG.imageUrl}${path}` : null,

    /**
     * Format number as USD currency
     * @param {number} value - Amount to format
     * @returns {string} Formatted currency string
     */
    formatCurrency: (value) => {
        if (!value && value !== 0) return '$0.00';
        
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
    }
};
