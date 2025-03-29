<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

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
