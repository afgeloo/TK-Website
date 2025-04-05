<?php
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['blog_id'])) {
    echo json_encode(["success" => false, "message" => "Missing blog_id"]);
    exit;
}

$blog_id = $data['blog_id'];

$query = "DELETE FROM tk_webapp.blogs WHERE blog_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $blog_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Delete failed"]);
}

$stmt->close();
$conn->close();
?>
