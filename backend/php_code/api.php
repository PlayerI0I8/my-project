<?php
// backend/php_code/api.php

// 1. อนุญาตให้ Frontend (Port 5173) เข้าถึงได้ (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 2. จำลองข้อมูล (จริงๆ ตรงนี้ต้อง Query Database)
$data = [
    "source" => "PHP (Elephant)",
    "message" => "Hello from PHP Docker!",
    "products" => [
        ["id" => 101, "name" => "Gaming Mouse", "price" => 1500],
        ["id" => 102, "name" => "Mechanical Keyboard", "price" => 3500]
    ]
];

// 3. ส่งกลับเป็น JSON
echo json_encode($data);
?>