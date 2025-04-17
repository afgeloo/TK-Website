<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

$uploadDir = '../../uploads/members-images/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (isset($_FILES['image']) && isset($_POST['user_id'])) {
    $image = $_FILES['image'];
    $userId = preg_replace('/[^a-zA-Z0-9\-]/', '', $_POST['user_id']);
    $extension = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));

    $existingExtensions = ['jpg', 'jpeg', 'png'];
    foreach ($existingExtensions as $ext) {
        $existingFile = $uploadDir . $userId . '.' . $ext;
        if (file_exists($existingFile)) {
            unlink($existingFile); 
        }
    }
    $imageName = $userId . '.' . $extension;
    $imagePath = $uploadDir . $imageName;

    if (move_uploaded_file($image['tmp_name'], $imagePath)) {
        echo json_encode([
            "success" => true,
            "image_url" => "/tara-kabataan-webapp/uploads/members-images/" . $imageName
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to save image."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing image or user_id."]);
}
?>
