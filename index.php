<?php
include './init.php';
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <title>Virtuelle Postkarte</title>
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/lib/quill_2.0.3.css">
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/main.css">

        <script src="<?= getBaseUrl() ?>js/lib/jquery-3.7.1.min.js"></script>
        <script src="<?= getBaseUrl() ?>js/lib/quill_2.0.3.js"></script>
        <script src="<?= getBaseUrl() ?>js/lib/html2canvas_1.4.1.min.js"></script>
    </head>
    <body>

        <div class="container">
            <h1>Virtuelle Postkarte erstellen</h1>
            <div class="editor-wrapper">
                <label>Nachricht:</label>
                <div id="editor"></div>
                <label>Hintergrund auswählen:</label>
                <select id="bg-select">
                    <option value="strand.jpg">Strand</option>
                    <option value="geburtstag.jpg">Geburtstag</option>
                </select>
                <button id="save">Speichern</button>
                <button id="share-ws">WhatsApp</button>
                <button id="share-tg">Telegram</button>
                <button onclick="window.print()">Drucken</button>
            </div>
            <div id="preview-wrapper">
                <div id="postcard">
                    <img id="bg-image" src="assets/hintergruende/strand.jpg" />
                    <div id="message-preview"></div>
                </div>
            </div>
        </div>
    </body>
</html>