<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die(json_encode(['status' => 'error', 'message' => 'Invalid request']));
}

// Sanitize form data
$firstName = htmlspecialchars(trim($_POST['firstName'] ?? ''));
$lastName  = htmlspecialchars(trim($_POST['lastName'] ?? ''));
$email     = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone     = htmlspecialchars(trim($_POST['phone'] ?? ''));
$message   = htmlspecialchars(trim($_POST['message'] ?? ''));
$fullName  = $firstName . ' ' . $lastName;

// Validate required fields
if (!$firstName || !$lastName || !$email) {
    die(json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']));
}

$mail = new PHPMailer(true);

try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'aditya.lohar@brightLinkinfotechnologies.com';
    $mail->Password   = 'Aditya@0000'; // Use app password if 2FA is enabled
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Sender and recipient
    $mail->setFrom('aditya.lohar@brightLinkinfotechnologies.com', 'Transport Website');
    $mail->addAddress('tejaspatil0582@gmail.com', 'Tejas Patil');

    // Optional Reply-To
    if ($email) {
        $mail->addReplyTo($email, $fullName);
    }

    // Email content
    $mail->isHTML(true);
    $mail->Subject = "New Transport Enquiry - $fullName";
    $mail->Body = "
        <div style='font-family:Arial,sans-serif;line-height:1.5'>
            <h2>New Enquiry Received</h2>
            <p><strong>Name:</strong> $fullName</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Message:</strong><br>$message</p>
        </div>
    ";

    $mail->send();

    // Redirect to thank-you page
    header("Location: thank-you.html");
    exit;

} catch (Exception $e) {
    // Log error for debugging
    error_log('Mail Error: ' . $mail->ErrorInfo);

    echo json_encode([
        'status' => 'error',
        'message' => 'Mail could not be sent. Check server logs.'
    ]);
}
