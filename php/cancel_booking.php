<?php
session_start();
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    header('HTTP/1.1 401 Unauthorized');
    exit;
}

$bookingId = $_GET['id'] ?? 0;

try {
    $stmt = $pdo->prepare('
        DELETE FROM bookings 
        WHERE id = ? AND user_id = ?
    ');
    $success = $stmt->execute([$bookingId, $_SESSION['user_id']]);
    
    if ($success && $stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Booking not found']);
    }
} catch (PDOException $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Database error']);
}
?>