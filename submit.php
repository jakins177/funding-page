<?php
require __DIR__ . '/vendor/autoload.php';

$logFile = __DIR__ . '/fundingconnect.log';
ini_set('log_errors', '1');
ini_set('error_log', $logFile);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$logPrefix = '[FundingConnect] ';

$logContext = function (string $message, array $context = []) use ($logPrefix): void {
    $formatted = $logPrefix . $message;

    if (!empty($context)) {
        $formatted .= ' | ' . json_encode($context, JSON_UNESCAPED_SLASHES);
    }

    error_log($formatted);
};

$logContext('Logging configured', ['file' => $logFile]);

$recipient = 'fundingconnect@palmtreesdigital.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    $logContext('Rejected non-POST request', ['method' => $_SERVER['REQUEST_METHOD'] ?? 'unknown']);
    exit;
}

$fields = [
    'name' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'email' => FILTER_VALIDATE_EMAIL,
    'phone' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'address' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'dealType' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'loanAmount' => FILTER_SANITIZE_NUMBER_INT,
    'details' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
];

$data = filter_input_array(INPUT_POST, $fields);

if (!is_array($data)) {
    http_response_code(400);
    echo 'Invalid submission.';
    $logContext('Invalid submission payload', ['raw_post' => $_POST]);
    exit;
}

foreach ($data as $key => $value) {
    if (is_string($value)) {
        $data[$key] = trim($value);
    }
}

$required = ['name', 'email', 'phone', 'address', 'dealType', 'loanAmount'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo 'Please complete all required fields.';
        $logContext('Missing required field', ['field' => $field, 'data' => $data]);
        exit;
    }
}

if ($data['email'] === false) {
    http_response_code(400);
    echo 'Please provide a valid email address.';
    $logContext('Invalid email detected', ['email' => $data['email']]);
    exit;
}

$details = $data['details'] ?? '';
$message = "A new funding request has been submitted:\n\n" .
    "Name: {$data['name']}\n" .
    "Email: {$data['email']}\n" .
    "Phone: {$data['phone']}\n" .
    "Property Address: {$data['address']}\n" .
    "Deal Type: {$data['dealType']}\n" .
    "Loan Amount: {$data['loanAmount']}\n\n" .
    "Deal Details:\n{$details}\n";

$subject = 'New Funding Request from ' . $data['name'];
$fromAddress = getenv('MAIL_FROM_ADDRESS') ?: 'no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'localhost');
$fromName = getenv('MAIL_FROM_NAME') ?: 'Funding Connect';

$mail = new PHPMailer(true);
$sent = false;

try {
    $smtpHost = getenv('SMTP_HOST');

    if (!empty($smtpHost)) {
        $mail->isSMTP();
        $mail->Host = $smtpHost;
        $mail->Port = (int)(getenv('SMTP_PORT') ?: 587);
        $mail->SMTPAuth = (bool)(getenv('SMTP_USERNAME') || getenv('SMTP_PASSWORD'));

        if ($mail->SMTPAuth) {
            $mail->Username = getenv('SMTP_USERNAME');
            $mail->Password = getenv('SMTP_PASSWORD');
        }

        $encryption = getenv('SMTP_ENCRYPTION') ?: PHPMailer::ENCRYPTION_STARTTLS;
        $mail->SMTPSecure = $encryption;

        $logContext('Configured SMTP transport', [
            'host' => $mail->Host,
            'port' => $mail->Port,
            'auth' => $mail->SMTPAuth,
            'encryption' => $mail->SMTPSecure,
            'username_set' => !empty($mail->Username),
        ]);
    } else {
        $mail->isMail();
        $logContext('Configured mail() transport');
    }

    $mail->CharSet = 'UTF-8';
    $mail->setFrom($fromAddress, $fromName);
    $mail->addAddress($recipient);
    $mail->addReplyTo($data['email'], $data['name']);

    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->AltBody = $message;
    $mail->isHTML(false);

    $sent = $mail->send();

    $logContext('Mail send attempt finished', [
        'sent' => $sent,
        'recipient' => $recipient,
        'from' => $fromAddress,
        'from_name' => $fromName,
    ]);
} catch (Exception $exception) {
    $logContext('PHPMailer error', ['message' => $exception->getMessage()]);
    $sent = false;
    http_response_code(500);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission Received</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0a1828; color: #fff; font-family: 'Inter', sans-serif; }
        .message-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 32px; border-radius: 12px; max-width: 520px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.4); }
        .message-box h1 { margin-bottom: 12px; font-size: 28px; }
        .message-box p { margin-bottom: 20px; color: #d1d5db; }
        .message-box a { color: #10b981; font-weight: 600; text-decoration: none; }
        .message-box a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="message-box">
        <?php if ($sent): ?>
            <h1>Thank You!</h1>
            <p>Your funding request has been sent to our team. We will follow up shortly.</p>
        <?php else: ?>
            <h1>Oops, something went wrong.</h1>
            <p>We couldn't send your request at this time. Please try again or reach out directly at <a href="mailto:fundingconnect@palmtreesdigital.com">fundingconnect@palmtreesdigital.com</a>.</p>
        <?php endif; ?>
        <a href="index.html">Back to form</a>
    </div>
</body>
</html>
