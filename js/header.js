function createHeader() {
    return `
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold">Book-kro</h1>
                <p class="text-gray-300">Your Movie Booking Destination</p>
            </div>
            <nav class="hidden md:flex space-x-6">
                <a href="#" class="hover:text-blue-400 transition-colors">Movies</a>
                <a href="#" class="hover:text-blue-400 transition-colors">Theaters</a>
                <a href="#" class="hover:text-blue-400 transition-colors">Bookings</a>
                <button id="theme-toggle" class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors ml-4">
                    🌙
                </button>
            </nav>
            <button id="hamburger" class="md:hidden flex flex-col space-y-1">
                <span class="w-6 h-0.5 bg-current"></span>
                <span class="w-6 h-0.5 bg-current"></span>
                <span class="w-6 h-0.5 bg-current"></span>
            </button>
        </div>
        <nav id="mobile-menu" class="hidden md:hidden mt-4 space-y-2">
            <a href="#" class="block hover:text-blue-400 transition-colors">Movies</a>
            <a href="#" class="block hover:text-blue-400 transition-colors">Theaters</a>
            <a href="#" class="block hover:text-blue-400 transition-colors">Bookings</a>
            <button id="mobile-theme-toggle" class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                🌙
            </button>
        </nav>
    `;
}

function toggleTheme() {
    const html = document.documentElement;
    const button = document.getElementById('theme-toggle');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        button.textContent = '🌙';
    } else {
        html.classList.add('dark');
        button.textContent = '☀️';
    }
}

function renderHeader() {
    document.getElementById('header').innerHTML = createHeader();
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
    document.getElementById('mobile-theme-toggle').addEventListener('click', toggleTheme);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}