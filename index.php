<?php
include './init.php';
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <title>Virtuelle Postkarte</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="<?= assetUrl('assets/favicon.png') ?>">

        <link rel="stylesheet" href="<?= assetUrl('css/lib/quill.snow.css') ?>">
        <link rel="stylesheet" href="<?= assetUrl('css/main.css') ?>">
        <link rel="stylesheet" href="<?= assetUrl('css/mobile.css') ?>">
        <link rel="stylesheet" href="<?= assetUrl('css/lib/all.min.css') ?>">
        <link rel="stylesheet" href="<?= assetUrl('css/emoji-panel.css') ?>">

        <script src="<?= assetUrl('js/lib/interact.min.js') ?>"></script>
        <script src="<?= assetUrl('js/lib/jquery.min.js') ?>"></script>
        <script src="<?= assetUrl('js/lib/quill.min.js') ?>"></script>
        <script src="<?= assetUrl('js/lib/html2canvas.min.js') ?>"></script>
        <script src="<?= assetUrl('js/functions.js') ?>"></script>
        <script src="<?= assetUrl('js/emoji-panel.js') ?>"></script>
        <script src="<?= assetUrl('js/main.js') ?>"></script>

    </head>
    <body>       
        <div class="card-wrapper">
            <h1>Virtuelle Postkarte erstellen</h1>
            <div class="card">
                <div class="left">                    
                    <div id="editor-wrapper" class="editor-wrapper">
                        <label>Nachricht:</label>
                        <div id="editor"></div>
                        <label for="bg-select-text">Text-Hintergrund:</label>
                        <select id="bg-select-text">
                            <option value="transparent" selected>Kein Hintergrund</option>
                            <option value="white">Weiß</option>
                            <option value="rgba(255,255,255,0.8)">Weiß (transparent)</option>
                            <option value="rgba(0,0,0,0.5)">Dunkel (transparent)</option>
                            <option value="#fdf6e3">Beige</option>
                        </select>
                        
                        <label>Hintergrundbild auswählen:</label>
                        <select id="bg-select">
                            <option value="strand_1200x800.jpg">Strand</option>
                            <option value="geburtstag_1200x800.jpg">Geburtstag</option>
                            <option value="herzen_1200x800.jpg">Herzen</option>
                            <option value="katze_1200x800.jpg">Katze</option>
                            <option value="winter_1200x800.jpg">Winter</option>
                        </select>
                        
                        <label for="bg-upload">Eigenes Hintergrundbild:</label>
                        <input type="file" id="bg-upload" accept="image/*">
                        <p class="uploadHint">
                            📐 Optimale Größe: <strong>1200×800 Pixel</strong> (Querformat). Das Bild wird bei Bedarf automatisch angepasst.
                        </p>     
                          
                        <label for="bg-upload">Filter wählen:</label>
                        <select id="filter-select">
                            <option value="none">Kein Filter</option>
                            <option value="sepia">Sepia</option>
                            <option value="brightness">Helligkeit +0.2</option>
                            <option value="contrast">Kontrast +0.4</option>
                            <option value="vignette">Vignette</option>
                            <option value="grayscale">Graustufen</option>
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
