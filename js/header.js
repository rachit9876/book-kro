function createHeader() {
    return `
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold">Book-kro</h1>
                
            </div>
            <nav class="hidden md:flex space-x-6">
                <a href="#" id="movies-tab" class="hover:text-blue-400 transition-colors">Movies</a>
                <a href="#" id="favorites-tab" class="hover:text-blue-400 transition-colors">Favorites</a>
                <a href="#" id="bookings-tab" class="hover:text-blue-400 transition-colors">My Bookings</a>
                <button id="theme-toggle" class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors ml-4">
                    <img src="assets/darkMode.svg" alt="Toggle theme" class="w-5 h-5 cursor-pointer">
                </button>
            </nav>
            <button id="hamburger" class="md:hidden flex flex-col space-y-1">
                <span class="w-6 h-0.5 bg-current"></span>
                <span class="w-6 h-0.5 bg-current"></span>
                <span class="w-6 h-0.5 bg-current"></span>
            </button>
        </div>
        <nav id="mobile-menu" class="hidden md:hidden mt-4 space-y-2">
            <a href="#" id="mobile-movies-tab" class="block hover:text-blue-400 transition-colors">Movies</a>
            <a href="#" id="mobile-favorites-tab" class="block hover:text-blue-400 transition-colors">Favorites</a>
            <a href="#" id="mobile-bookings-tab" class="block hover:text-blue-400 transition-colors">My Bookings</a>
            <button id="mobile-theme-toggle" class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                <img src="assets/darkMode.svg" alt="Toggle theme" class="w-5 h-5 cursor-pointer">
            </button>
        </nav>
    `;
}

function toggleTheme() {
    const html = document.documentElement;
    const button = document.getElementById('theme-toggle');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
    } else {
        html.classList.add('dark');
    }
}

function renderHeader() {
    document.getElementById('header').innerHTML = createHeader();
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
    document.getElementById('mobile-theme-toggle').addEventListener('click', toggleTheme);
    
    // Tab navigation
    document.getElementById('movies-tab').addEventListener('click', (e) => {
        e.preventDefault();
        showMoviesTab();
    });
    document.getElementById('favorites-tab').addEventListener('click', (e) => {
        e.preventDefault();
        showFavoritesTab();
    });
    document.getElementById('bookings-tab').addEventListener('click', (e) => {
        e.preventDefault();
        showBookingsTab();
    });
    
    // Mobile tabs
    document.getElementById('mobile-movies-tab').addEventListener('click', (e) => {
        e.preventDefault();
        showMoviesTab();
        toggleMobileMenu();
    });
    document.getElementById('mobile-favorites-tab').addEventListener('click', (e) => {
        e.preventDefault();
        showFavoritesTab();
        toggleMobileMenu();
    });
    document.getElementById('mobile-bookings-tab').addEventListener('click', (e) => {
        e.preventDefault();
        showBookingsTab();
        toggleMobileMenu();
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}