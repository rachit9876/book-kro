<?php
session_start();
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    header('HTTP/1.1 401 Unauthorized');
    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $pdo->prepare('
    SELECT b.*, e.title 
    FROM bookings b
    JOIN events e ON b.event_id = e.id
    WHERE user_id = ?
');
$stmt->execute([$user_id]);
$bookings = $stmt->fetchAll();

echo json_encode($bookings);
?> 
