function createMovieModal(movie) {
    return `
        <div id="movie-modal" class="fixed inset-0 bg-black bg-opacity-0 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 transition-all duration-300">
            <div class="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-lg w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transform translate-y-full sm:translate-y-0 sm:scale-75 transition-all duration-300">
                <div class="relative">
                    <button id="close-modal" class="absolute top-3 right-3 bg-black bg-opacity-70 hover:bg-opacity-90 text-white text-xl z-10 w-20 h-10 rounded-md flex items-center justify-center transition-all leading-none">Close</button>
                    ${movie.backdrop_path ? `<img src="${IMAGE_BASE_URL}${movie.backdrop_path}" alt="${movie.title}" class="w-full h-48 sm:h-64 object-cover rounded-t-2xl sm:rounded-t-lg">` : ''}
                </div>
                <div class="p-4 sm:p-6">
                    <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        ${movie.poster_path ? `<img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}" class="w-32 h-48 sm:w-48 sm:h-72 object-cover rounded-lg mx-auto sm:mx-0 flex-shrink-0">` : ''}
                        <div class="flex-1">
                            <h2 class="text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left">${movie.title}</h2>
                            <div class="flex items-center justify-center sm:justify-start gap-4 mb-4">
                                <span class="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">★ ${movie.vote_average.toFixed(1)}</span>
                                <span class="text-gray-600 dark:text-gray-400 text-sm">${movie.release_date}</span>
                            </div>
                            <p class="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">${movie.overview}</p>
                            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button id="add-to-favorites" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors text-center touch-manipulation">
                                    ♥ Add to Favorites
                                </button>
                                <button id="book-tickets" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors text-center touch-manipulation">
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
        
        const modal = document.getElementById('movie-modal');
        const content = modal.querySelector('div');
        
        setTimeout(() => {
            modal.classList.remove('bg-opacity-0');
            modal.classList.add('bg-opacity-50');
            content.classList.remove('translate-y-full', 'sm:scale-75');
            content.classList.add('translate-y-0', 'sm:scale-100');
        }, 10);
        
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
    if (modal) {
        const content = modal.querySelector('div');
        modal.classList.remove('bg-opacity-50');
        modal.classList.add('bg-opacity-0');
        content.classList.remove('translate-y-0', 'sm:scale-100');
        content.classList.add('translate-y-full', 'sm:scale-75');
        setTimeout(() => modal.remove(), 300);
    }
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