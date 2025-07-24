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
  <title>BookMyEvent - Booking</title>
  <link rel="stylesheet" href="css/styles.css">
  <style>
    /* Add your existing seat styles here */
  </style>
</head>
<body>
  <header>
    <h1>Seat Selection</h1>
    <nav>
      <a href="index.php">Home</a>
      <a href="myBookings.php">My Bookings</a>
    </nav>
  </header>
  <main>
    <div class="screen">Screen This Way</div>
    <form id="bookingForm" action="php/book.php" method="POST">
      <input type="hidden" name="event_id" value="<?php echo $_GET['event_id']; ?>">
      <div class="seats-container" id="seatGrid"></div>
      <input type="hidden" id="seatsInput" name="seats" required>
      <button type="submit">Confirm Selected Seats</button>
    </form>
  </main>

  <script>
    const seatGrid = document.getElementById('seatGrid');
    const seatsInput = document.getElementById('seatsInput');
    const rows = 5;
    const cols = 8;
    let selectedSeats = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const seat = document.createElement('button');
        seat.className = 'seat';
        seat.type = 'button';
        const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;
        seat.textContent = seatNumber;
        
        if (Math.random() < 0.1) seat.className += ' booked';
        
        seat.addEventListener('click', () => {
          if (!seat.classList.contains('booked')) {
            seat.classList.toggle('selected');
            updateSelectedSeats(seatNumber);
          }
        });
        seatGrid.appendChild(seat);
      }
    }

    function updateSelectedSeats(seatNumber) {
      const index = selectedSeats.indexOf(seatNumber);
      if (index === -1) {
        selectedSeats.push(seatNumber);
      } else {
        selectedSeats.splice(index, 1);
      }
      seatsInput.value = selectedSeats.join(', ');
    }
  </script>
</body>
</html>