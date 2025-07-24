const API_KEY = '0a0a0f8a3015737bf280ff45a2ec950c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// API response cache for better performance
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Request debouncing for search
let searchController = null;

const api = {
    // Enhanced error handling wrapper
    async makeRequest(url, cacheKey = null) {
        try {
            // Check cache first
            if (cacheKey && apiCache.has(cacheKey)) {
                const cached = apiCache.get(cacheKey);
                if (Date.now() - cached.timestamp < CACHE_DURATION) {
                    return cached.data;
                }
                apiCache.delete(cacheKey);
            }

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache successful responses
            if (cacheKey) {
                apiCache.set(cacheKey, {
                    data,
                    timestamp: Date.now()
                });
            }
            
            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            
            // Return cached data if available during error
            if (cacheKey && apiCache.has(cacheKey)) {
                console.warn('Using stale cache data due to network error');
                return apiCache.get(cacheKey).data;
            }
            
            // Throw custom error for better UX
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network connection failed. Please check your internet connection.');
            }
            
            throw error;
        }
    },

    async getUpcomingMovies(page = 1) {
        const cacheKey = `upcoming_${page}`;
        return this.makeRequest(
            `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-IN&region=IN&page=${page}`,
            cacheKey
        );
    },
    
    async searchMovies(query, page = 1) {
        // Cancel previous search request
        if (searchController) {
            searchController.abort();
        }
        
        searchController = new AbortController();
        
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
        
        try {
            const response = await fetch(url, { signal: searchController.signal });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Search request cancelled');
                return null;
            }
            throw error;
        }
    },
    
    async discoverMovies({ genre, sort, page = 1 }) {
        const cacheKey = `discover_${genre || 'all'}_${sort || 'popularity'}_${page}`;
        let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;
        
        if (genre) url += `&with_genres=${genre}`;
        if (sort) url += `&sort_by=${sort}`;
        
        return this.makeRequest(url, cacheKey);
    },
    
    async getMovieDetails(movieId) {
        const cacheKey = `movie_${movieId}`;
        return this.makeRequest(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`,
            cacheKey
        );
    },

    // New method for better image loading
    getImageUrl(path, size = 'w500') {
        if (!path) return 'assets/placeHolder.webp';
        return `https://image.tmdb.org/t/p/${size}${path}`;
    },

    // Preload images for better UX
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    },

    // Clear cache method for memory management
    clearCache() {
        apiCache.clear();
        console.log('API cache cleared');
    }
};