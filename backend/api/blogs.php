<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../config/db.php';

// Check if a single blog_id is requested
if (isset($_GET['blog_id'])) {
    $blog_id = intval($_GET['blog_id']); // Ensure it's an integer
    $query = "SELECT * FROM blogs WHERE blog_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $blog_id);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $blog = $result->fetch_assoc();

        if ($blog) {
            echo json_encode($blog, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Blog not found."]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch blog."]);
    }

    $stmt->close();
    $conn->close();
    exit; // Stop further execution
}

// Default: Fetch all blogs
$category = isset($_GET['category']) ? strtoupper($_GET['category']) : 'ALL';

$response = [
    "pinned" => [],
    "blogs" => []
];

// Fetch pinned blogs
$pinnedQuery = "SELECT * FROM blogs WHERE pinned = 1 ORDER BY created_at DESC LIMIT 3";
$pinnedResult = $conn->query($pinnedQuery);
if ($pinnedResult) {
    $response["pinned"] = $pinnedResult->fetch_all(MYSQLI_ASSOC);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch pinned blogs."]);
    exit;
}

// Fetch regular blogs with optional category filter
if ($category === 'ALL') {
    $query = "SELECT * FROM blogs ORDER BY created_at DESC";
    $stmt = $conn->prepare($query);
} else {
    $query = "SELECT * FROM blogs WHERE category = ? ORDER BY created_at DESC";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $category);
}

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $response["blogs"] = $result->fetch_all(MYSQLI_ASSOC);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch blogs."]);
    exit;
}

$stmt->close();
$conn->close();

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
