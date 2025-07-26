# 🎬 Book-kro (👉 [Try Now](http://book-kro.pages.dev/) )

A modern movie booking web application that allows users to discover movies, check showtimes, and book tickets online.

## Features

- **Movie Discovery**: Browse latest and upcoming movies
- **Search & Filter**: Find movies by title, genre, or release date
- **Movie Details**: View detailed information including ratings, cast, and synopsis
- **Ticket Booking**: Select seats and book movie tickets
- **Payment Integration**: Secure payment processing
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **API**: The Movie Database (TMDB) API
- **Architecture**: Component-based JavaScript modules

## Project Structure

```
Book-kro/
├── assets/          # Images and static assets
├── css/             # Stylesheets
├── js/              # JavaScript components
│   ├── api.js       # API integration
│   ├── app.js       # Main application
│   ├── booking.js   # Booking functionality
│   ├── header.js    # Header component
│   ├── movieCard.js # Movie card component
│   ├── movieModal.js# Movie details modal
│   ├── pagination.js# Pagination component
│   ├── payment.js   # Payment processing
│   └── search.js    # Search functionality
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

- **Header**: Navigation and theme toggle
- **Movie Cards**: Display movie information
- **Search**: Movie search functionality
- **Pagination**: Navigate through movie pages
- **Modal**: Movie details popup
- **Booking**: Seat selection and booking
- **Payment**: Payment processing interface

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