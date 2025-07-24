const API_KEY = '0a0a0f8a3015737bf280ff45a2ec950c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = {
    async getUpcomingMovies(page = 1) {
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-IN&region=IN&page=${page}`);
        return response.json();
    },
    
    async searchMovies(query, page = 1) {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
        return response.json();
    },
    
    async discoverMovies({ genre, sort, page = 1 }) {
        let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;
        if (genre) url += `&with_genres=${genre}`;
        if (sort) url += `&sort_by=${sort}`;
        const response = await fetch(url);
        return response.json();
    },
    
    async getMovieDetails(movieId) {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        return response.json();
    }
};