function createMovieCard(movie, isFavorite = false) {
    const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'assets/placeHolder.webp';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    return `
        <div class="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all movie-card" data-movie-id="${movie.id}">
            <div class="aspect-square relative">
                <img src="${posterUrl}" alt="${movie.title}" class="w-full h-full object-contain" onerror="this.src='assets/placeHolder.webp'">
                <div class="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                    ★ ${rating}
                </div>
                ${isFavorite ? `<button class="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors remove-favorite" data-movie-id="${movie.id}">×</button>` : ''}
            </div>
            <div class="p-4">
                <div class="text-lg font-semibold mb-2">${movie.title}</div>
                <div class="text-gray-600 dark:text-gray-400 text-sm mb-2">${new Date(movie.release_date).toLocaleDateString()}</div>
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors book-btn" data-movie-id="${movie.id}">
                    Book Now
                </button>
            </div>
        </div>
    `;
}

