<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

ini_set('display_errors', 0); 
ini_set('log_errors', 1);
error_reporting(E_ALL);
error_log("Starting bulk delete...");

require_once '../config/db.php';

try {
    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);

    if (!isset($data['partner_ids']) || !is_array($data['partner_ids'])) {
        throw new Exception("Invalid input: partner_ids missing or not array. Raw: $raw");
    }

    $ids = array_filter(array_map('trim', $data['partner_ids']));
    if (empty($ids)) {
        throw new Exception("No valid partner IDs received.");
    }

    $placeholders = implode(',', array_fill(0, count($ids), '?'));

    // Delete images
    $selectSql = "SELECT partner_image FROM tk_webapp.partnerships WHERE partner_id IN ($placeholders)";
    $selectStmt = $conn->prepare($selectSql);
    $selectStmt->execute($ids);

    while ($row = $selectStmt->fetch(PDO::FETCH_ASSOC)) {
        if (!empty($row['partner_image'])) {
            $imagePath = realpath(__DIR__ . '/../../' . ltrim($row['partner_image'], '/'));
            if (file_exists($imagePath)) {
                if (!unlink($imagePath)) {
                    error_log("Failed to delete image: " . $imagePath);
                }
            }
        }
    }

    // Delete from DB
    $deleteSql = "DELETE FROM tk_webapp.partnerships WHERE partner_id IN ($placeholders)";
    $deleteStmt = $conn->prepare($deleteSql);
    $success = $deleteStmt->execute($ids);

    echo json_encode(["success" => $success]);
} catch (Exception $e) {
    error_log("Bulk delete failed: " . $e->getMessage());
    echo json_encode(["success" => false, "error" => "Server error"]);
}
