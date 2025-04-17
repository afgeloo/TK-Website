<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include '../config/db.php';

function resolveImageByUserId($userId) {
    $extensions = ['jpg', 'jpeg', 'png'];
    $baseDir = realpath('../../uploads/members-images');
    $baseUrl = '/tara-kabataan-webapp/uploads/members-images/';

    foreach ($extensions as $ext) {
        $file = $baseDir . '/' . $userId . '.' . $ext;
        if (file_exists($file)) {
            return $baseUrl . $userId . '.' . $ext;
        }
    }

    return null;
}

$query = "
    SELECT 
        users.user_id,
        users.user_name,
        users.role_id,
        roles.role_name 
    FROM tk_webapp.users 
    JOIN tk_webapp.roles ON users.role_id = roles.role_id
";

$result = $conn->query($query);

if ($result) {
    $council = [];
    while ($row = $result->fetch_assoc()) {
        $row['user_image'] = resolveImageByUserId($row['user_id']);
        $council[] = $row;
    }

    echo json_encode($council, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch council members."]);
}
?>
