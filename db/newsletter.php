<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    
    if (!$email) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }
    
    try {
        $stmt = $conn->prepare("INSERT INTO newsletter_subscribers (email) VALUES (?)");
        $stmt->execute([$email]);
        
        // Send welcome email
        require_once __DIR__ . '/PHPMailer/PHPMailer.php';
        require_once __DIR__ . '/PHPMailer/SMTP.php';
        require_once __DIR__ . '/PHPMailer/Exception.php';
        
        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\Exception;
        
        $mail = new PHPMailer(true);
        try {
            //Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'YOUR_GMAIL_ADDRESS@gmail.com'; // TODO: set your email
            $mail->Password = 'YOUR_APP_PASSWORD'; // TODO: set your app password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            //Recipients
            $mail->setFrom('YOUR_GMAIL_ADDRESS@gmail.com', 'LeadBryte Solutions');
            $mail->addAddress($email);
            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Welcome to LeadBryte Solutions Newsletter!';
            $mail->Body    = '<h2>Thank you for subscribing!</h2><p>You are now subscribed to our newsletter.</p>';
            $mail->AltBody = 'Thank you for subscribing! You are now subscribed to our newsletter.';
            $mail->send();
        } catch (Exception $e) {
            // Email failed, but don't block subscription
        }
        echo json_encode([
            'success' => true,
            'message' => 'Successfully subscribed to newsletter!'
        ]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Duplicate entry
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'This email is already subscribed'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'An error occurred. Please try again later.'
            ]);
        }
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}