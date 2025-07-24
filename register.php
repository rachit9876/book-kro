<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BookMyEvent - Register</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <h1>Register</h1>
    <nav>
      <a href="index.php">Home</a>
    </nav>
  </header>
  <main>
    <form id="registerForm" action="php/register.php" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required minlength="6">
      <button type="submit">Register</button>
      <p>Already have an account? <a href="login.php">Login here</a></p>
    </form>
  </main>
</body>
</html> 
