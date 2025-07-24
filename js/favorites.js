function createFavoritesSection() {
    return `
        <section id="favorites-section" class="mb-8 hidden">
            <h2 class="text-2xl font-bold mb-4">My Favorites</h2>
            <div id="favorites-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"></div>
        </section>
    `;
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesGrid = document.getElementById('favorites-grid');
    const favoritesSection = document.getElementById('favorites-section');
    
    if (favorites.length > 0) {
        favoritesSection.classList.remove('hidden');
        favoritesGrid.innerHTML = favorites.map(movie => createMovieCard(movie, true)).join('');
    } else {
        favoritesSection.classList.add('hidden');
    }
}

function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
    showNotification('Removed from favorites');
}