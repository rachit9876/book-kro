const API_KEY = '0a0a0f8a3015737bf280ff45a2ec950c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = {
    async getUpcomingMovies(page = 1) {
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-IN&region=IN&page=${page}`);
        return response.json();
    }
};