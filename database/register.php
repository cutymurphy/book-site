<?php
// Путь к файлу, в который будут записаны данные пользователя
$file_path = 'users.txt';

// Проверяем, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    // Создаем строку с данными пользователя
    $user_data = "Username: $username, Email: $email, Password: $password\n";

    // Открываем файл для записи
    file_put_contents($file_path, $user_data, FILE_APPEND);

    // Перенаправляем пользователя на страницу благодарности или другую страницу
    // header('Location: thank_you.html');
    exit();
}
?>
