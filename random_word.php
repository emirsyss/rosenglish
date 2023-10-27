<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rosenglish";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

$sonuc = $conn->query("SELECT englishwords FROM words ORDER BY RAND() LIMIT 1");

if ($sonuc->num_rows > 0) {
    $satir = $sonuc->fetch_assoc();
    $rastgeleKelime = $satir["englishwords"];
    echo $rastgeleKelime;
} else {
    echo "Kelime bulunamadı.";
}

$conn->close();
?>