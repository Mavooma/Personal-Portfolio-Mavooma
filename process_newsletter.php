<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize inputs
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    // Validate inputs
    if (empty($name) || empty($email)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
        exit;
    }

    // Store subscriber in database (you'll need to set up your database)
    try {
        $pdo = new PDO("mysql:host=localhost;dbname=your_database", "username", "password");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM subscribers WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'error', 'message' => 'Email already subscribed']);
            exit;
        }

        // Insert new subscriber
        $stmt = $pdo->prepare("INSERT INTO subscribers (name, email) VALUES (?, ?)");
        $stmt->execute([$name, $email]);

        // Send confirmation email
        $to = $email;
        $subject = "Newsletter Subscription Confirmation";
        $message = "Dear $name,\n\nThank you for subscribing to my newsletter! You'll receive updates about my latest projects.\n\nBest regards,\nVuyelwa Mavuma";
        $headers = "From: vmavuma@techgirlshub.co.za\n";
        $headers .= "Reply-To: vmavuma@techgirlshub.co.za\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        mail($to, $subject, $message, $headers);

        echo json_encode(['status' => 'success', 'message' => 'Successfully subscribed to newsletter']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Database error']);
    }
} else {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?> 