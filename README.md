# 🎬 Book-kro (👉 [Try Now](http://book-kro.pages.dev/) )

A modern movie booking web application that allows users to discover movies, check showtimes, and book tickets online.

## Features

- **Movie Discovery**: Browse popular and upcoming movies with infinite pagination
- **Advanced Search**: Real-time search with suggestions and autocomplete
- **Smart Filtering**: Filter by genre, rating, release date, and popularity
- **Movie Details**: Comprehensive movie information with cast, ratings, and trailers
- **Complete Booking Flow**: Theater selection, showtime booking, and seat type selection
- **QR Code Payment**: Integrated UPI payment system with QR code scanning
- **Booking Management**: View and manage all your movie bookings
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Lazy loading, image optimization, and efficient API caching
- **Error Handling**: Robust error boundaries with retry mechanisms

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **API**: The Movie Database (TMDB) API
- **Architecture**: Reusable component-based JavaScript modules

## Project Structure

```
Book-kro/
├── assets/          # Images and static assets
│   ├── darkMode.svg # Theme toggle icon
│   ├── placeHolder.webp # Fallback movie poster
│   ├── qr.jpg       # Payment QR code
│   └── qr.svg       # QR code icon
├── css/
│   └── styles.css   # Main stylesheet
├── js/              # Reusable JavaScript components
│   ├── api.js       # TMDB API integration
│   ├── app.js       # Main application logic
│   ├── booking.js   # Ticket booking functionality
│   ├── customDropdown.js # Custom dropdown component
│   ├── debug.js     # Development debugging utilities
│   ├── header.js    # Header component with navigation
│   ├── movieCard.js # Movie card component
│   ├── movieModal.js# Movie details modal component
│   ├── pagination.js# Pagination component
│   ├── payment.js   # Payment processing component
│   └── search.js    # Search and filter functionality
├── index.html       # Main HTML file
└── README.md        # Project documentation
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Book-kro
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience

3. **API Configuration**
   - The app uses TMDB API for movie data
   - API configuration is handled in `js/api.js`

## Components

The application is built using reusable JavaScript components organized in the `js/` folder:

- **API Component** (`api.js`): TMDB API integration with request handling and image URL generation
- **App Component** (`app.js`): Main application logic, state management, error handling, and navigation
- **Booking Component** (`booking.js`): Complete ticket booking flow with seat selection and validation
- **Custom Dropdown Component** (`customDropdown.js`): Mobile-friendly dropdown component with search functionality
- **Debug Component** (`debug.js`): Development utilities for testing and debugging
- **Header Component** (`header.js`): Navigation bar with theme toggle, mobile menu, and tab switching
- **Movie Card Component** (`movieCard.js`): Reusable cards for displaying movie information with lazy loading
- **Movie Modal Component** (`movieModal.js`): Detailed movie information popup with booking integration
- **Pagination Component** (`pagination.js`): Navigate through movie pages with keyboard support
- **Payment Component** (`payment.js`): QR code payment processing and booking confirmation
- **Search Component** (`search.js`): Advanced search with suggestions, filters, and real-time results

All components are modular, reusable, and follow modern JavaScript practices with proper error handling and accessibility features.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.