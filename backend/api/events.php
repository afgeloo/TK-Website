<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../config/db.php';

$status = isset($_GET['status']) ? $_GET['status'] : 'ALL';

$response = [];

// ✅ Get today’s date
$today = date('Y-m-d');

// ✅ Step 1: Update past events from "Upcoming" to "Done"
$updateDoneQuery = "UPDATE tk_webapp.events SET event_status = 'Done' 
                    WHERE event_status = 'Upcoming' AND event_date < ?";
$updateDoneStmt = $conn->prepare($updateDoneQuery);
$updateDoneStmt->bind_param("s", $today);
$updateDoneStmt->execute();
$updateDoneStmt->close();

// ✅ Step 2: Update future events from "Done" to "Upcoming" (in case status was wrong)
$updateUpcomingQuery = "UPDATE tk_webapp.events SET event_status = 'Upcoming' 
                        WHERE event_status = 'Done' AND event_date >= ?";
$updateUpcomingStmt = $conn->prepare($updateUpcomingQuery);
$updateUpcomingStmt->bind_param("s", $today);
$updateUpcomingStmt->execute();
$updateUpcomingStmt->close();

// ✅ Step 3: Fetch events (with optional status filtering)
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
