<?php
include './init.php';
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <title>Virtuelle Postkarte</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="<?= getBaseUrl() ?>assets/favicon.png">
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/lib/quill_snow_1.3.7.css">
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/main.css">
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/mobile.css">
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/lib/quill-emoji_0.1.7.css">
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/lib/font-awesome-6.5.0.css">

        <script src="<?= getBaseUrl() ?>js/lib/interact_1.10.27.min.js"></script>
        <script src="<?= getBaseUrl() ?>js/lib/jquery-3.7.1.min.js"></script>
        <script src="<?= getBaseUrl() ?>js/lib/quill_1.3.7.min.js"></script>
        <script src="<?= getBaseUrl() ?>js/lib/html2canvas_1.4.1.min.js"></script>
        <script src="<?= getBaseUrl() ?>js/lib/quill-emoji_0.1.7.js"></script>
        <script src="<?= getBaseUrl() ?>js/functions.js"></script>
        <script src="<?= getBaseUrl() ?>js/main.js"></script>
        
    </head>
    <body>       
        <div class="card-wrapper">
            <h1>Virtuelle Postkarte erstellen</h1>
            <div class="card">
                <div class="left">                    
                    <div id="editor-wrapper" class="editor-wrapper">
                        <label>Nachricht:</label>
                        <div id="editor"></div>
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
                            <option value="transparent" selected>Kein Hintergrund</option>
                            <option value="white">Weiß</option>
                            <option value="rgba(255,255,255,0.8)">Weiß (transparent)</option>
                            <option value="rgba(0,0,0,0.5)">Dunkel (transparent)</option>
                            <option value="#fdf6e3">Beige</option>
                        </select>
                        <button id="add-textbox" class="btn-social btn-add"><i class="fa-solid fa-plus"></i> Textfeld hinzufügen</button>
                    </div>      
                </div>

                <div class="right">
                    <div id="preview-wrapper">
                        <div id="postcard">
                            <img id="bg-image" src="assets/hintergruende/strand_1200x800.jpg" />
                        </div>
                    </div>
                    <div id="buttonBar">                                    
                        <button id="download" class="btn-social btn-download"><i class="fa-solid fa-download"></i></button>                                                
                        <button id="print" class="btn-social btn-print"><i class="fa-solid fa-print"></i> </button>                        
                    </div>
                </div>
            </div>
            <footer style="text-align: center; padding: 20px; font-size: 0.9em;">
                <a href="<?= getBaseUrl() ?>datenschutz.php">Datenschutz</a> |
                <a href="<?= getBaseUrl() ?>impressum.php">Impressum</a>
            </footer>
        </div>        
    </body>
</html>
