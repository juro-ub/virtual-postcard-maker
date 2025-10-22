<?php
require_once 'init.php';
?>
<!DOCTYPE html>
<html lang="<?= $current_lang ?>">
    <head>
        <meta charset="UTF-8">
        <title><?= t('privacy.title') ?></title>
        <link rel="stylesheet" href="<?= assetUrl('css/main.css') ?>">
        <link rel="icon" type="image/png" href="<?= assetUrl('assets/favicon.png') ?>">
    </head>
    <body style="padding: 40px; font-family: system-ui, sans-serif;">
        <h1 style="text-align: center;"><?= t('privacy.title') ?></h1>

        <p><?= t('privacy.intro') ?></p>

        <h2><?= t('privacy.controller') ?></h2>
        <p>
            Julian Rost<br>
            Tübingen, <?= t('privacy.country') ?><br>
            E-Mail: <a href="mailto:julianrost20@gmail.com">julianrost20@gmail.com</a>
        </p>

        <h2><?= t('privacy.data_collected') ?></h2>
        <ul>
            <li><?= t('privacy.data_collected_1') ?></li>
            <li><?= t('privacy.data_collected_2') ?></li>
        </ul>

        <h2><?= t('privacy.processing') ?></h2>
        <p><?= t('privacy.processing_text') ?></p>

        <h2><?= t('privacy.disclosure') ?></h2>
        <p><?= t('privacy.disclosure_text') ?></p>

        <h2><?= t('privacy.rights') ?></h2>
        <p><?= t('privacy.rights_text') ?></p>

        <footer style="margin-top: 40px; text-align: center;">
            <a href="<?= getBaseUrl() ?>?lang=<?= $current_lang ?>"><?= t('imprint.back_home') ?></a>
        </footer>
    </body>
</html>
