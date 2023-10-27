<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rosenglish";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

$dosya = fopen("words.txt", "r");
if ($dosya) {
    while (($kelime = fgets($dosya)) !== false) {
        $kelime = trim($kelime);
        
        $kontrol = "SELECT * FROM words WHERE englishwords = '$kelime'";
        $sonuc = $conn->query($kontrol);

        if ($sonuc->num_rows == 0) {
            $ekle = "INSERT INTO words (englishwords) VALUES ('$kelime')";
            if ($conn->query($ekle) === TRUE) {
                echo "Kelime başarıyla eklendi: " . $kelime . "<br>";
            } else {
                echo "Hata: " . $ekle . "<br>" . $conn->error;
            }
        } else {
            echo "Kelime zaten var: " . $kelime . "<br>";
        }
    }
    fclose($dosya);
} else {
    echo "Dosya açma hatası";
}

$conn->close();
?>