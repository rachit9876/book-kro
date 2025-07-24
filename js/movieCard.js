function createMovieCard(movie) {
    const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';
    
    return `
        <div class="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all" onclick="bookMovie('${movie.id}', '${movie.title}')">
            <div class="aspect-square">
                <img src="${posterUrl}" alt="${movie.title}" class="w-full h-full object-contain">
            </div>
            <div class="p-4">
                <div class="text-lg font-semibold mb-2">${movie.title}</div>
                <div class="text-gray-600 dark:text-gray-400 text-sm">${new Date(movie.release_date).toLocaleDateString()}</div>
            </div>
        </div>
    `;
}

function bookMovie(movieId, movieTitle) {
    alert(`Booking ${movieTitle}... (Feature coming soon!)`);
}