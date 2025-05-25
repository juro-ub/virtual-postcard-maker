<?php
include './init.php';
// Datei: print.php
$postcardHtml = $_POST['html'] ?? '<p>Fehler: Keine Daten empfangen.</p>';
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <title>Postkarte drucken</title>
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/print.css">
    </head>
    <body>
        <?= $postcardHtml ?>
        <script>
            window.onload = function () {
                window.print();
                window.onafterprint = function () {
                    //window.close();
                };
            };
        </script>
    </body>
</html>