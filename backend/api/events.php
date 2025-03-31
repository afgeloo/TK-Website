<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../config/db.php';

$status = isset($_GET['status']) ? $_GET['status'] : 'ALL';

$response = [];

if (strtoupper($status) === 'ALL') {
    $query = "SELECT * FROM tk_webapp.events ORDER BY created_at DESC";
    $stmt = $conn->prepare($query);
} else {
    $query = "SELECT * FROM tk_webapp.events WHERE UPPER(event_status) = ? ORDER BY created_at DESC";
    $stmt = $conn->prepare($query);
    $upperStatus = strtoupper($status);
    $stmt->bind_param("s", $upperStatus);
}

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $response = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to execute SQL query."]);
}

$stmt->close();
$conn->close();
?>
