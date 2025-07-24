<?php
session_start();
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: ../login.php');
    exit();
}

$event_id = $_POST['event_id'];
$seats = $_POST['seats'];
$user_id = $_SESSION['user_id'];

try {
    $pdo->beginTransaction();
    
    // Insert booking
    $stmt = $pdo->prepare('INSERT INTO bookings (user_id, event_id, seats) VALUES (?, ?, ?)');
    $stmt->execute([$user_id, $event_id, $seats]);
    
    // Update available seats
    $stmt = $pdo->prepare('UPDATE events SET seats_available = seats_available - ? WHERE id = ?');
    $stmt->execute([count(explode(',', $seats)), $event_id]);
    
    $pdo->commit();
    header('Location: ../confirmation.php');
} catch (Exception $e) {
    $pdo->rollBack();
    header('Location: ../booking.php?event_id=' . $event_id . '&error=booking_failed');
}
exit();
?> 
