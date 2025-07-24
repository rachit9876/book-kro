let currentPage = 1;

async function loadUpcomingMovies(page = 1) {
    try {
        const data = await api.getUpcomingMovies(page);
        const movieGrid = document.getElementById('movie-grid');
        const paginationContainer = document.getElementById('pagination');
        
        movieGrid.innerHTML = data.results.map(movie => createMovieCard(movie)).join('');
        paginationContainer.innerHTML = createPagination(data.page, data.total_pages, loadUpcomingMovies);
        
        currentPage = data.page;
        setupPaginationEvents(currentPage, data.total_pages, loadUpcomingMovies);
    } catch (error) {
        console.error('Error loading movies:', error);
        document.getElementById('movie-grid').innerHTML = '<p>Error loading movies. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('dark');
    renderHeader();
    loadUpcomingMovies();
    
    document.addEventListener('click', (e) => {
        if (e.target.id === 'theme-toggle') {
            toggleTheme();
        }
    });
});