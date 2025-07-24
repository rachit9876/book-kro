let currentPage = 1;

async function loadPopularMovies(page = 1) {
    try {
        const data = await api.discoverMovies({ sort: 'popularity.desc', page });
        const movieGrid = document.getElementById('movie-grid');
        const paginationContainer = document.getElementById('pagination');
        
        movieGrid.innerHTML = data.results.map(movie => createMovieCard(movie)).join('');
        paginationContainer.innerHTML = createPagination(data.page, data.total_pages, loadPopularMovies);
        
        currentPage = data.page;
        setupPaginationEvents(currentPage, data.total_pages, loadPopularMovies);
    } catch (error) {
        console.error('Error loading movies:', error);
        document.getElementById('movie-grid').innerHTML = '<p>Error loading movies. Please try again later.</p>';
    }
}

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
    initializeApp();
});

function initializeApp() {
    document.getElementById('search-container').innerHTML = createSearchBar();
    document.getElementById('favorites-container').innerHTML = createFavoritesSection();
    
    loadPopularMovies();
    loadFavorites();
    setupSearchEvents();
    setupGlobalEvents();
}

function setupGlobalEvents() {
    document.addEventListener('click', (e) => {
        if (e.target.id === 'theme-toggle' || e.target.alt === 'Toggle theme') {
            toggleTheme();
        }
        
        if (e.target.classList.contains('movie-card') || e.target.closest('.movie-card')) {
            const movieCard = e.target.classList.contains('movie-card') ? e.target : e.target.closest('.movie-card');
            const movieId = movieCard.dataset.movieId;
            if (!e.target.classList.contains('book-btn') && !e.target.classList.contains('remove-favorite')) {
                showMovieModal(movieId);
            }
        }
        
        if (e.target.classList.contains('book-btn')) {
            e.stopPropagation();
            const movieId = e.target.dataset.movieId;
            api.getMovieDetails(movieId).then(movie => showBookingModal(movie));
        }
        
        if (e.target.classList.contains('remove-favorite')) {
            e.stopPropagation();
            const movieId = e.target.dataset.movieId;
            removeFromFavorites(parseInt(movieId));
        }
    });
}

function showMoviesTab() {
    document.getElementById('upcoming-movies').classList.remove('hidden');
    document.getElementById('favorites-section').classList.add('hidden');
    document.getElementById('bookings-container').classList.add('hidden');
    document.getElementById('search-container').classList.remove('hidden');
}

function showFavoritesTab() {
    document.getElementById('upcoming-movies').classList.add('hidden');
    document.getElementById('favorites-section').classList.remove('hidden');
    document.getElementById('bookings-container').classList.add('hidden');
    document.getElementById('search-container').classList.add('hidden');
    loadFavorites();
}

function showBookingsTab() {
    document.getElementById('upcoming-movies').classList.add('hidden');
    document.getElementById('favorites-section').classList.add('hidden');
    document.getElementById('bookings-container').classList.remove('hidden');
    document.getElementById('search-container').classList.add('hidden');
    loadBookings();
}

function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingsList = document.getElementById('bookings-list');
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p class="text-gray-500">No bookings found.</p>';
        return;
    }
    
    bookingsList.innerHTML = bookings.map(booking => `
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-bold text-lg">Booking #${booking.id}</h3>
                    <p class="text-gray-600 dark:text-gray-400">Theater: ${booking.theater}</p>
                    <p class="text-gray-600 dark:text-gray-400">Date: ${booking.date} at ${booking.time}</p>
                    <p class="text-gray-600 dark:text-gray-400">Tickets: ${booking.tickets}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-lg">₹${booking.total}</p>
                    <p class="text-sm text-gray-500">Booked on ${new Date(booking.timestamp).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    `).join('');
}