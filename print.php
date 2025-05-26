<?php
include './init.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['imageData'])) {
    $imageData = $_POST['imageData'];
} else {
    die("Keine Bilddaten übergeben.");
}
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <title>Postkarte drucken</title>
        <link rel="stylesheet" href="<?= getBaseUrl() ?>print.css">
    </head>
    <body>
        <img src="<?= htmlspecialchars($imageData) ?>" alt="Postkarte" class="print-image" />
        <script>
            window.onload = function () {
                window.print();
                window.onafterprint = function () {
                    window.close();
                };
            };
        </script>
    </body>
</html>