function createMovieModal(movie) {
    return `
        <div id="movie-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="relative">
                    <button id="close-modal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl z-10">×</button>
                    ${movie.backdrop_path ? `<img src="${IMAGE_BASE_URL}${movie.backdrop_path}" alt="${movie.title}" class="w-full h-64 object-cover rounded-t-lg">` : ''}
                </div>
                <div class="p-6">
                    <div class="flex gap-6">
                        ${movie.poster_path ? `<img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}" class="w-48 h-72 object-cover rounded-lg flex-shrink-0">` : ''}
                        <div class="flex-1">
                            <h2 class="text-3xl font-bold mb-2">${movie.title}</h2>
                            <div class="flex items-center gap-4 mb-4">
                                <span class="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">★ ${movie.vote_average.toFixed(1)}</span>
                                <span class="text-gray-600 dark:text-gray-400">${movie.release_date}</span>
                            </div>
                            <p class="text-gray-700 dark:text-gray-300 mb-6">${movie.overview}</p>
                            <div class="flex gap-4">
                                <button id="add-to-favorites" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                                    ♥ Add to Favorites
                                </button>
                                <button id="book-tickets" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                                    🎫 Book Tickets
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showMovieModal(movieId) {
    api.getMovieDetails(movieId).then(movie => {
        document.body.insertAdjacentHTML('beforeend', createMovieModal(movie));
        
        document.getElementById('close-modal').addEventListener('click', closeMovieModal);
        document.getElementById('movie-modal').addEventListener('click', (e) => {
            if (e.target.id === 'movie-modal') closeMovieModal();
        });
        
        document.getElementById('add-to-favorites').addEventListener('click', () => {
            addToFavorites(movie);
            closeMovieModal();
        });
        
        document.getElementById('book-tickets').addEventListener('click', () => {
            showBookingModal(movie);
        });
    });
}

function closeMovieModal() {
    const modal = document.getElementById('movie-modal');
    if (modal) modal.remove();
}

function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.find(fav => fav.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showNotification('Added to favorites!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}