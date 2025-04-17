<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once '../config/db.php'; 

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['user_id'])) {
    echo json_encode(["success" => false, "message" => "Invalid data."]);
    exit;
}

$user_id = $data['user_id'];
$user_name = $data['user_name'] ?? "";
$role_id = $data['role_id'] ?? "";
$user_image = $data['user_image'] ?? "";

$query = "UPDATE users SET user_name = ?, role_id = ?, user_image = ? WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssss", $user_name, $role_id, $user_image, $user_id);

if ($stmt->execute()) {
    $sql = "SELECT u.user_id, u.user_name, u.user_image, u.role_id, r.role_name 
            FROM users u 
            LEFT JOIN roles r ON u.role_id = r.role_id 
            WHERE u.user_id = ?";
    
    $fetchStmt = $conn->prepare($sql);
    $fetchStmt->bind_param("s", $user_id);
    $fetchStmt->execute();
    $result = $fetchStmt->get_result();
    $updatedUser = $result->fetch_assoc();

    echo json_encode(["success" => true, "user" => $updatedUser]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

?>
