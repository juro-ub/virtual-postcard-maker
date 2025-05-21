<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadDir = __DIR__ . '/output/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $filename = 'postkarte-' . time() . '.png';
    $filepath = $uploadDir . $filename;
    if (move_uploaded_file($_FILES['image']['tmp_name'], $filepath)) {
        echo 'output/' . $filename;
    } else {
        echo 'Fehler beim Speichern';
    }
} else {
    echo 'Keine Datei empfangen';
}