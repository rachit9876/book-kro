<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BookMyEvent - Home</title>
  <link rel="stylesheet" href="css/styles.css">
  <script defer src="js/script.js"></script>
</head>
<body>
  <header>
    <h1>Book My Event</h1>
    <nav>
      <a href="index.php">Home</a>
      <?php if(isset($_SESSION['user_id'])): ?>
        <a href="myBookings.php">My Bookings</a>
        <a href="php/logout.php" id="logoutBtn">Logout</a>
      <?php else: ?>
        <a href="login.php">Login</a>
        <a href="register.php">Register</a>
      <?php endif; ?>
    </nav>
  </header>

  <main>
    <h2>Upcoming Events</h2>
    <section id="eventsContainer" class="events-grid"></section>
  </main>

  <script>
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch('php/get_events.php');
      const events = await response.json();
      
      const container = document.getElementById('eventsContainer');
      container.innerHTML = events.map(event => `
        <div class="event-card">
          <img src="${event.image}" alt="${event.title}" class="event-img">
          <h3>${event.title}</h3>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Venue:</strong> ${event.venue}</p>
          <p><strong>Price:</strong> ₹${event.price}</p>
          <button onclick="window.location.href='booking.php?event_id=${event.id}'">Book Now</button>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error loading events:', error);
    }
  });
  </script>
</body>
</html>