<?php
$recipient = 'fundingconnect@palmtreesdigital.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
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

$required = ['name', 'email', 'phone', 'address', 'dealType', 'loanAmount'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo 'Please complete all required fields.';
        exit;
    }
}

if ($data['email'] === false) {
    http_response_code(400);
    echo 'Please provide a valid email address.';
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
$headers = 'From: no-reply@' . $_SERVER['SERVER_NAME'] . "\r\n" .
           'Reply-To: ' . $data['email'] . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

$sent = mail($recipient, $subject, $message, $headers);
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
