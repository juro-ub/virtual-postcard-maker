<?php
include './init.php';
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <title>Virtuelle Postkarte</title>
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/lib/quill_snow_1.3.7.css">
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/main.css">
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/lib/quill-emoji_0.1.7.css">
        
        <script src="<?= getBaseUrl() ?>js/lib/jquery-3.7.1.min.js"></script>
        <script src="<?= getBaseUrl() ?>js/lib/quill_1.3.7.min.js"></script>
        <script src="<?= getBaseUrl() ?>js/lib/html2canvas_1.4.1.min.js"></script>
        <script src="<?= getBaseUrl() ?>js/lib/quill-emoji_0.1.7.js"></script>
        <script src="<?= getBaseUrl() ?>js/main.js"></script>
    </head>
    <body>

        <div class="container">
            <h1>Virtuelle Postkarte erstellen</h1>
            <div class="editor-wrapper">
                <label>Nachricht:</label>
                <div id="editor"></div>                
            </div>
            <div>
                <label>Hintergrundbild auswählen:</label>
                <select id="bg-select">
                    <option value="strand_1200x800.jpg">Strand</option>
                    <option value="geburtstag_1200x800.jpg">Geburtstag</option>
                    <option value="herzen_1200x800.jpg">Herzen</option>
                    <option value="katze_1200x800.jpg">Katze</option>
                    <option value="winter_1200x800.jpg">Winter</option>
                </select>
                <label for="bg-select-text">Text-Hintergrund:</label>
                <select id="bg-select-text">
                    <option value="transparent">Kein Hintergrund</option>
                    <option value="white">Weiß</option>
                    <option value="rgba(255,255,255,0.8)">Weiß (transparent)</option>
                    <option value="rgba(0,0,0,0.5)">Dunkel (transparent)</option>
                    <option value="#fdf6e3">Beige</option>
                </select>
                <button id="add-textbox">➕Textfeld hinzufügen</button>
                <button id="share-ws">WhatsApp</button>
                <button id="share-tg">Telegram</button>
                <button onclick="window.print()">Drucken</button>
            </div>
            <div id="preview-wrapper">
                <div id="postcard">
                    <img id="bg-image" src="assets/hintergruende/strand_1200x800.jpg" />
                </div>
            </div>
        </div>
    </body>
</html>
