<?php
require 'config.php';

$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    $stmt->execute([$name, $email, $password]);
    header('Location: ../login.php?success=registered');
} catch (PDOException $e) {
    header('Location: ../register.php?error=email_exists');
}
exit();
?> 
