async function loadUpcomingMovies() {
    try {
        const data = await api.getUpcomingMovies();
        const movieGrid = document.getElementById('movie-grid');
        movieGrid.innerHTML = data.results.map(movie => createMovieCard(movie)).join('');
    } catch (error) {
        console.error('Error loading movies:', error);
        document.getElementById('movie-grid').innerHTML = '<p>Error loading movies. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    loadUpcomingMovies();
});