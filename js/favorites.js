function createFavoritesSection() {
    return `
        <section id="favorites-section" class="mb-8 hidden animate-fade-in">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl md:text-3xl font-bold">My Favorites</h2>
                <button id="clear-all-favorites" class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors hidden">
                    Clear All
                </button>
            </div>
            <div id="favorites-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"></div>
            <div id="favorites-empty" class="text-center py-12 hidden">
                <div class="text-6xl mb-4">💔</div>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">No favorites yet</p>
                <p class="text-sm text-gray-500 dark:text-gray-500 mb-4">Add movies to your favorites to see them here!</p>
                <button onclick="showMoviesTab()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Browse Movies
                </button>
            </div>
        </section>
    `;
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesGrid = document.getElementById('favorites-grid');
    const favoritesSection = document.getElementById('favorites-section');
    const favoritesEmpty = document.getElementById('favorites-empty');
    const clearAllBtn = document.getElementById('clear-all-favorites');
    
    if (favorites.length > 0) {
        favoritesSection.classList.remove('hidden');
        favoritesEmpty.classList.add('hidden');
        favoritesGrid.classList.remove('hidden');
        clearAllBtn.classList.remove('hidden');
        
        // Sort favorites by date added (most recent first)
        const sortedFavorites = favorites.sort((a, b) => {
            const timeA = a.dateAdded || 0;
            const timeB = b.dateAdded || 0;
            return timeB - timeA;
        });
        
        favoritesGrid.innerHTML = sortedFavorites.map(movie => createMovieCard(movie, true)).join('');
        
        // Setup clear all favorites event listener
        clearAllBtn.replaceWith(clearAllBtn.cloneNode(true)); // Remove existing listeners
        document.getElementById('clear-all-favorites').addEventListener('click', showClearFavoritesConfirmation);
        
        // Lazy load images
        lazyLoadImages();
        
        // Add animation to cards
        animateFavoriteCards();
        
    } else {
        favoritesGrid.classList.add('hidden');
        favoritesEmpty.classList.remove('hidden');
        clearAllBtn.classList.add('hidden');
        
        // If favorites section is visible, show it
        if (!favoritesSection.classList.contains('hidden')) {
            favoritesSection.classList.remove('hidden');
        }
    }
}

function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const movieToRemove = favorites.find(movie => movie.id === movieId);
    
    if (movieToRemove) {
        favorites = favorites.filter(movie => movie.id !== movieId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        showToast(`"${movieToRemove.title}" removed from favorites`, 'info');
        
        // Add removal animation
        const movieCard = document.querySelector(`[data-movie-id="${movieId}"]`);
        if (movieCard) {
            movieCard.style.transform = 'scale(0.8)';
            movieCard.style.opacity = '0';
            
            setTimeout(() => {
                loadFavorites();
            }, 300);
        } else {
            loadFavorites();
        }
        
        // Update favorites count in header if needed
        updateFavoritesCount();
    }
}

function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (!favorites.find(fav => fav.id === movie.id)) {
        const favoriteMovie = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            dateAdded: Date.now()
        };
        
        favorites.unshift(favoriteMovie); // Add to beginning
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        showToast(`"${movie.title}" added to favorites! ❤️`, 'success');
        
        // Update favorites count
        updateFavoritesCount();
        
        // If favorites section is currently visible, reload it
        if (!document.getElementById('favorites-section').classList.contains('hidden')) {
            loadFavorites();
        }
        
        return true;
    } else {
        showToast('Movie already in favorites', 'info');
        return false;
    }
}

function showClearFavoritesConfirmation() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.length === 0) return;
    
    const confirmModal = `
        <div id="clear-favorites-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 text-center">
                <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </div>
                
                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Clear All Favorites?</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">This will remove all ${favorites.length} movies from your favorites. This action cannot be undone.</p>
                
                <div class="flex gap-3">
                    <button id="cancel-clear" class="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button id="confirm-clear" class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors">
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmModal);
    
    // Setup event listeners
    document.getElementById('cancel-clear').addEventListener('click', () => {
        document.getElementById('clear-favorites-modal').remove();
    });
    
    document.getElementById('confirm-clear').addEventListener('click', () => {
        clearAllFavorites();
        document.getElementById('clear-favorites-modal').remove();
    });
    
    // Click outside to cancel
    document.getElementById('clear-favorites-modal').addEventListener('click', (e) => {
        if (e.target.id === 'clear-favorites-modal') {
            document.getElementById('clear-favorites-modal').remove();
        }
    });
}

function clearAllFavorites() {
    localStorage.removeItem('favorites');
    showToast('All favorites cleared', 'info');
    loadFavorites();
    updateFavoritesCount();
}

function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const count = favorites.length;
    
    // Update favorites tab with count if needed
    const favoritesTab = document.getElementById('favorites-tab');
    const mobileFavoritesTab = document.getElementById('mobile-favorites-tab');
    
    if (favoritesTab) {
        const baseText = 'Favorites';
        favoritesTab.textContent = count > 0 ? `${baseText} (${count})` : baseText;
    }
    
    if (mobileFavoritesTab) {
        const baseText = '❤️ Favorites';
        mobileFavoritesTab.textContent = count > 0 ? `${baseText} (${count})` : baseText;
    }
}

function animateFavoriteCards() {
    const cards = document.querySelectorAll('#favorites-grid .movie-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function isFavorite(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(fav => fav.id === movieId);
}

function getFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.length;
}

function exportFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.length === 0) {
        showToast('No favorites to export', 'info');
        return;
    }
    
    const dataStr = JSON.stringify(favorites, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `book-kro-favorites-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showToast('Favorites exported successfully!', 'success');
}

function importFavorites(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const importedFavorites = JSON.parse(e.target.result);
            
            if (Array.isArray(importedFavorites)) {
                const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                const merged = [...currentFavorites];
                let addedCount = 0;
                
                importedFavorites.forEach(movie => {
                    if (!merged.find(fav => fav.id === movie.id)) {
                        merged.push({
                            ...movie,
                            dateAdded: Date.now()
                        });
                        addedCount++;
                    }
                });
                
                localStorage.setItem('favorites', JSON.stringify(merged));
                loadFavorites();
                updateFavoritesCount();
                
                showToast(`Imported ${addedCount} new favorites!`, 'success');
            } else {
                throw new Error('Invalid file format');
            }
        } catch (error) {
            console.error('Import error:', error);
            showToast('Failed to import favorites. Invalid file format.', 'error');
        }
    };
    
    reader.readAsText(file);
}

// Initialize favorites count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
});