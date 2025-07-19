<?php
// submit_order.php

// Получение данных из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$message = $data['message'];

// Проверка обязательных полей
if(empty($phone)){
    http_response_code(400);
    echo json_encode(['error' => 'Телефон обязателен']);
    exit;
}

// Отправка email (пример)
$to = 'homiecosyplaid@yandex.ru';
$subject = 'Новая заявка с сайта';
$body = "Имя: $name\nEmail: $email\nТелефон: $phone\nЗаявка:\n$message";

$headers = "From: no-reply@yourdomain.com";

if(mail($to, $subject, $body, $headers)){
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка при отправке письма']);
}
?>