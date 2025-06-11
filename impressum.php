<?php
require_once 'init.php';
?>
<!DOCTYPE html>
<html lang="<?= $current_lang ?>">
    <head>
        <meta charset="UTF-8">
        <title><?= t('imprint') ?></title>
        <link rel="icon" type="image/png" href="<?= assetUrl('assets/favicon.png') ?>">
        <link rel="stylesheet" href="<?= assetUrl('css/main.css') ?>">
    </head>
    <body style="padding: 40px; font-family: system-ui, sans-serif;">
        <h1><?= t('imprint') ?></h1>
        <p><?= t('imprint.law') ?></p>
        <p>
            Julian Rost<br>
            Tübingen, <?= t('imprint.country') ?><br>
            E-Mail: <a href="mailto:julianrost20@gmail.com">julianrost20@gmail.com</a>
        </p>

        <h2><?= t('imprint.liability_content') ?></h2>
        <p><?= t('imprint.liability_content_text') ?></p>

        <h2><?= t('imprint.liability_links') ?></h2>
        <p><?= t('imprint.liability_links_text') ?></p>

        <h2><?= t('imprint.copyright') ?></h2>
        <p><?= t('imprint.copyright_text') ?></p>

        <footer style="margin-top: 40px;">
            <a href="<?= getBaseUrl() ?>?lang=<?= $current_lang ?>"><?= t('imprint.back_home') ?></a>
        </footer>
    </body>
</html>
