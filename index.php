<?php
include './init.php';
?>
<!DOCTYPE html>
<html lang="<?= $current_lang ?>">

<head>
    <meta charset="UTF-8">
    <title>Virtuelle Postkarte</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="<?= assetUrl('assets/favicon.png') ?>">

    <link rel="stylesheet" href="<?= assetUrl('css/lib/quill.snow.css') ?>">
    <link rel="stylesheet" href="<?= assetUrl('css/lib/bootstrap.min.css') ?>">
    <link rel="stylesheet" href="<?= assetUrl('css/main.css') ?>">
    <link rel="stylesheet" href="<?= assetUrl('css/mobile.css') ?>">
    <link rel="stylesheet" href="<?= assetUrl('css/lib/all.min.css') ?>">
    <link rel="stylesheet" href="<?= assetUrl('css/emoji-panel.css') ?>">
    <link rel="stylesheet" href="<?= assetUrl('css/lib/cropper.min.css') ?>">
    <link rel="stylesheet" href="<?= assetUrl('css/modal.css') ?>">

    <script src="<?= assetUrl('js/lib/interact.min.js') ?>"></script>
    <script src="<?= assetUrl('js/lib/bootstrap.bundle.min.js') ?>"></script>
    <script src="<?= assetUrl('js/lib/cropper.min.js') ?>"></script>
    <script src="<?= assetUrl('js/lib/jquery.min.js') ?>"></script>
    <script src="<?= assetUrl('js/lib/quill.min.js') ?>"></script>
    <script src="<?= assetUrl('js/lib/html2canvas.min.js') ?>"></script>
    <script src="<?= assetUrl('js/functions.js') ?>"></script>
    <script src="<?= assetUrl('js/emoji-panel.js') ?>"></script>
    <script src="<?= assetUrl('js/main.js') ?>"></script>

</head>

<body>
    <div class="card-wrapper">
        <!-- Icons rund um die Karte -->
        <img src="assets/icons/heart.png" class="icon-png icon-top icon-heart" alt="Oben">
        <img src="assets/icons/star.png" class="icon-png icon-right" alt="Rechts">
        <img src="assets/icons/sun.png" class="icon-png icon-bottom" alt="Unten">
        <img src="assets/icons/moon.png" class="icon-png icon-left" alt="Links">

          <!-- Icons in den Ecken -->
        <img src="assets/icons/flower.png" class="icon-png icon-topleft" alt="Ecke oben links">
        <img src="assets/icons/butterfly.png" class="icon-png icon-topright" alt="Ecke oben rechts">
        <img src="assets/icons/leaf.png" class="icon-png icon-bottomleft" alt="Ecke unten links">
        <img src="assets/icons/shell.png" class="icon-png icon-bottomright" alt="Ecke unten rechts">


        <h1><?= t('headline') ?></h1>
        <!-- Sprach-Flaggen Auswahl -->
        <div class="lang-flagbar">
            <?php foreach ($supported_languages as $code => $lang): ?>
                <a href="?lang=<?= $code ?>"
                    class="lang-flag<?= $code === $current_lang ? ' active' : '' ?>"
                    title="<?= $lang['name'] ?>">
                    <?= $lang['flag'] ?>
                </a>
            <?php endforeach; ?>
        </div>
        <!-- Ende Sprachauswahl -->
        <div class="card">
            <div class="left">
                <div id="editor-wrapper" class="editor-wrapper">
                    <label><?= t('message') ?></label>
                    <div id="editor"></div>
                    <label for="bg-select-text"><?= t('text_bg') ?></label>
                    <select class="form-select" id="bg-select-text">
                        <option value="rgba(0,0,0,0)"><?= t('bg_none') ?></option>
                        <option value="rgba(255,255,255,1)"><?= t('bg_white') ?></option>
                        <option value="rgba(255,255,255,0.8)"><?= t('bg_white_trans') ?></option>
                        <option value="rgba(0,0,0,0.5)"><?= t('bg_dark_trans') ?></option>
                        <option value="rgba(253,246,227,1)"><?= t('bg_beige') ?></option>
                    </select>

                    <label><?= t('bg_select_label') ?></label>
                    <select class="form-select" id="bg-select">
                        <option value="strand_1200x800.jpg"><?= t('bg_option_strand') ?></option>
                        <option value="geburtstag_1200x800.jpg"><?= t('bg_option_geburtstag') ?></option>
                        <option value="herzen_1200x800.jpg"><?= t('bg_option_herzen') ?></option>
                        <option value="katze_1200x800.jpg"><?= t('bg_option_katze') ?></option>
                        <option value="winter_1200x800.jpg"><?= t('bg_option_winter') ?></option>
                        <option value="city_1200x800.jpg"><?= t('bg_option_city') ?></option>
                        <option value="ski_snowboard_1200x800.jpg"><?= t('bg_option_ski') ?></option>
                    </select>

                    <label for="bg-upload"><?= t('bg_own_label') ?></label>
                    <input class="form-control" type="file" id="bg-upload" accept="image/*" lang="<?= $current_lang ?>">
                    <p class="uploadHint">
                        <?= t('upload_hint') ?>
                    </p>

                    <!-- Modal -->
                    <div id="cropperModal" class="modal-overlay">
                        <div class="modal-content">
                            <img id="bg-cropper-image" alt="Cropper">
                            <div class="modal-actions">
                                <button id="crop-btn" class="btn btn-primary"><?= t('crop_accept') ?></button>
                                <button id="cancel-btn" class="btn btn-primary"><?= t('crop_cancel') ?></button>
                            </div>
                        </div>
                    </div>


                    <label for="filter-select"><?= t('filter_select_label') ?></label>
                    <select class="form-select" id="filter-select">
                        <option value="none"><?= t('filter_none') ?></option>
                        <option value="sepia"><?= t('filter_sepia') ?></option>
                        <option value="brightness"><?= t('filter_brightness') ?></option>
                        <option value="contrast"><?= t('filter_contrast') ?></option>
                        <option value="grayscale"><?= t('filter_grayscale') ?></option>
                        <option value="blur"><?= t('filter_blur') ?></option>
                        <option value="huerotate"><?= t('filter_huerotate') ?></option>
                    </select>
                    <button id="add-textbox" class="btn btn-primary"><i class="fa-solid fa-plus"></i> <?= t('add_textbox') ?></button>
                </div>
            </div>

            <div class="right">
                <div id="preview-wrapper">
                    <div id="postcard">
                        <img id="bg-image" src="assets/hintergruende/strand_1200x800.jpg" />
                    </div>
                </div>
                <div id="buttonBar">
                    <button id="download" class="btn btn-primary"><i class="fa-solid fa-download"></i> <?= t('download') ?></button>
                    <button id="print" class="btn btn-primary"><i class="fa-solid fa-print"></i> <?= t('print') ?></button>
                </div>
            </div>
        </div>
        <footer>
            <a href="<?= getBaseUrl() ?>datenschutz.php?lang=<?= $current_lang ?>"><?= t('privacy') ?></a> |
            <a href="<?= getBaseUrl() ?>impressum.php?lang=<?= $current_lang ?>"><?= t('imprint') ?></a>
        </footer>
    </div>
</body>

</html>