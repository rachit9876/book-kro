<?php session_start(); 
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BookMyEvent - My Bookings</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <h1>My Bookings</h1>
    <nav>
      <a href="index.php">Home</a>
      <a href="booking.php">Book More</a>
    </nav>
  </header>
  <main>
    <section id="bookingsContainer" class="events-grid"></section>
  </main>

  <script>
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch('php/get_bookings.php');
      if (!response.ok) throw new Error('Failed to load bookings');
      
      const bookings = await response.json();
      const container = document.getElementById('bookingsContainer');
      
      if (bookings.length === 0) {
        container.innerHTML = "<p>No bookings found.</p>";
        return;
      }

      bookings.forEach(booking => {
        const div = document.createElement('div');
        div.className = 'event-card';
        div.innerHTML = `
          <p><strong>Event:</strong> ${booking.title}</p>
          <p><strong>Date:</strong> ${new Date(booking.booking_date).toLocaleDateString()}</p>
          <p><strong>Seats:</strong> ${booking.seats}</p>
          <button onclick="cancelBooking(${booking.id})">Cancel</button>
        `;
        container.appendChild(div);
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load bookings');
    }
  });

  async function cancelBooking(bookingId) {
    try {
      const response = await fetch(`php/cancel_booking.php?id=${bookingId}`);
      if (!response.ok) throw new Error('Failed to cancel booking');
      alert('Booking cancelled');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to cancel booking');
    }
  }
  </script>
</body>
</html>