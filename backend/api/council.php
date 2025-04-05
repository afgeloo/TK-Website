<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include '../config/db.php';

$query = "
    SELECT 
        users.user_name,
        users.user_image, 
        roles.role_name 
    FROM tk_webapp.users 
    JOIN tk_webapp.roles ON users.role_id = roles.role_id
";

$result = $conn->query($query);

if ($result) {
    $council = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($council, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch council members."]);
}
?>
