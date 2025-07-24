<?php
require 'config.php';

header('Content-Type: application/json');

$stmt = $pdo->query('SELECT * FROM events');
$events = $stmt->fetchAll();

echo json_encode($events);
?> 
