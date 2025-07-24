<?php
session_start();
require 'config.php';

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    header('Location: ../index.php');
} else {
    header('Location: ../login.php?error=invalid_credentials');
}
exit();
?> 
