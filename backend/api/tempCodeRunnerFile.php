<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config/db.php";

// Ensure $conn is defined and connected
if (!$conn) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$result = $conn->query("SELECT * FROM events");
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>