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
  <title>BookMyEvent - Confirmation</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <h1>Booking Confirmation</h1>
  </header>
  <main>
    <h2>Thank you for your booking!</h2>
    <p>Your booking details have been saved. You can view them in your "My Bookings" section.</p>
    <a href="index.php">Back to Home</a>
  </main>
</body>
</html> 
