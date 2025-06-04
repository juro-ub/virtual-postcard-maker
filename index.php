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
        <link rel="stylesheet" href="<?= assetUrl('css/lib/cropper.min.css') ?>">

        <script src="<?= assetUrl('js/lib/interact.min.js') ?>"></script>
        <script src="<?= assetUrl('js/lib/cropper.min.js') ?>"></script>
        <script src="<?= assetUrl('js/lib/jquery.min.js') ?>"></script>
        <script src="<?= assetUrl('js/lib/quill.min.js') ?>"></script>
        <script src="<?= assetUrl('js/lib/html2canvas.min.js') ?>"></script>
        <script src="<?= assetUrl('js/functions.js') ?>"></script>
        <script src="<?= assetUrl('js/emoji-panel.js') ?>"></script>
        <script src="<?= assetUrl('js/main.js') ?>"></script>
  <style>
    /* Einfaches natives Modal */
    .modal-overlay {
      display: none;
      position: fixed;
      z-index: 9999;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5);
      align-items: center;
      justify-content: center;
    }
    .modal-overlay.active {
      display: flex;
    }
    .modal-content {
      background: #fff;
      padding: 1.5rem;
      border-radius: 8px;
      max-width: 90vw;
      max-height: 90vh;
      box-shadow: 0 2px 24px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .modal-content img {
      max-width: 80vw;
      max-height: 60vh;
      margin-bottom: 1rem;
    }
    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1rem;
    }
  </style>
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
                            <option value="rgba(0,0,0,0)">Kein Hintergrund</option>
                            <option value="rgba(255,255,255,1)">Weiß</option>
                            <option value="rgba(255,255,255,0.8)">Weiß (transparent)</option>
                            <option value="rgba(0,0,0,0.5)">Dunkel (transparent)</option>
                            <option value="rgba(253,246,227,1)">Beige</option>
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
                        <!-- Verstecktes File-Input -->
                        <input type="file" id="bg-upload" accept="image/*" style="display:none;">
                        <!-- Label als Button-Ersatz -->
                        <label for="bg-upload" class="btn-social btn-custom btn-select-bg">Bild auswählen</label>
                        <p class="uploadHint">
                            📐 Optimale Größe: <strong>1200×800 Pixel</strong> (Querformat).
                        </p>

                        <!-- Modal -->
                        <div id="cropperModal" class="modal-overlay">
                          <div class="modal-content">
                            <img id="bg-cropper-image" alt="Cropper">
                            <div class="modal-actions">
                              <button id="crop-btn" class="btn-social btn-custom">Ausschnitt übernehmen</button>
                              <button id="cancel-btn" class="btn-social btn-custom">Abbrechen</button>
                            </div>
                          </div>
                        </div>

                          
                        <label for="filter-select">Filter wählen:</label>
                        <select id="filter-select">
                            <option value="none">Kein Filter</option>
                            <option value="sepia">Sepia</option>
                            <option value="brightness">Helligkeit +0.2</option>
                            <option value="contrast">Kontrast +0.4</option>
                            <option value="grayscale">Graustufen</option>
                            <option value="blur">Weichzeichnen</option>
                            <option value="huerotate">Farbton verschieben</option>
                        </select>
                        <button id="add-textbox" class="btn-social btn-custom"><i class="fa-solid fa-plus"></i> Textfeld hinzufügen</button>
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
