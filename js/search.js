function createSearchBar() {
    return `
        <div class="mb-6">
            <div class="flex gap-4 flex-wrap">
                <input 
                    type="text" 
                    id="search-input" 
                    placeholder="Search movies..." 
                    class="flex-1 min-w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <select id="genre-filter" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                    <option value="">All Genres</option>
                    <option value="28">Action</option>
                    <option value="35">Comedy</option>
                    <option value="18">Drama</option>
                    <option value="27">Horror</option>
                    <option value="10749">Romance</option>
                    <option value="878">Sci-Fi</option>
                </select>
                <select id="sort-filter" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                    <option value="popularity.desc">Most Popular</option>
                    <option value="vote_average.desc">Highest Rated</option>
                    <option value="release_date.desc">Latest Release</option>
                </select>
            </div>
        </div>
    `;
}

let searchTimeout;
let typingInterval;

function startTypingEffect() {
    const searchInput = document.getElementById('search-input');
    const messages = ['Search movies...', 'AI Powered Search...', 'Find your favorite films...'];
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        if (searchInput !== document.activeElement) {
            const currentMessage = messages[messageIndex];
            
            if (!isDeleting && charIndex < currentMessage.length) {
                searchInput.placeholder = currentMessage.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                searchInput.placeholder = currentMessage.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    messageIndex = (messageIndex + 1) % messages.length;
                }
                setTimeout(type, isDeleting ? 1000 : 500);
            }
        } else {
            setTimeout(type, 1000);
        }
    }
    
    type();
}

function setupSearchEvents() {
    const searchInput = document.getElementById('search-input');
    const genreFilter = document.getElementById('genre-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    startTypingEffect();

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (e.target.value.trim()) {
                searchMovies(e.target.value);
            } else {
                loadUpcomingMovies();
            }
        }, 500);
    });

    genreFilter.addEventListener('change', () => filterMovies());
    sortFilter.addEventListener('change', () => filterMovies());
}

async function searchMovies(query) {
    try {
        const data = await api.searchMovies(query);
        displayMovies(data.results);
    } catch (error) {
        console.error('Search error:', error);
    }
}

async function filterMovies() {
    const genre = document.getElementById('genre-filter').value;
    const sort = document.getElementById('sort-filter').value;
    
    try {
        const data = await api.discoverMovies({ genre, sort });
        displayMovies(data.results);
    } catch (error) {
        console.error('Filter error:', error);
    }
}

function displayMovies(movies) {
    const movieGrid = document.getElementById('movie-grid');
    movieGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
}