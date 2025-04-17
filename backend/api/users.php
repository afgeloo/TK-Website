<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "tk_webapp");

if ($conn->connect_error) {
  die(json_encode(["success" => false, "message" => "Connection failed."]));
}

$sql = "SELECT users.user_id, users.user_name, users.user_image, roles.role_name, roles.role_id
        FROM users
        LEFT JOIN roles ON users.role_id = roles.role_id";

$result = $conn->query($sql);

$users = [];
while ($row = $result->fetch_assoc()) {
  $users[] = $row;
}

echo json_encode(["success" => true, "users" => $users]);
$conn->close();
?>
