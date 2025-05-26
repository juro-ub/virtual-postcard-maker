<?php
require_once 'init.php';
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <title>Datenschutzerklärung</title>
        <link rel="stylesheet" href="<?= getBaseUrl() ?>css/main.css">
    </head>
    <body style="padding: 40px; font-family: system-ui, sans-serif;">
        <h1 style="text-align: center;">Datenschutzerklärung</h1>

        <p>Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Diese Webseite dient ausschließlich der Erstellung und dem lokalen Druck von virtuellen Postkarten. Dabei gelten folgende Grundsätze:</p>

        <h2>1. Verantwortlich für die Datenverarbeitung</h2>
        <p>
            Julian Rost<br>
            Tübingen, Deutschland<br>
            E-Mail: <a href="mailto:julianrost20@gmail.com">julianrost20@gmail.com</a>
        </p>

        <h2>2. Erhobene Daten</h2>
        <ul>
            <li>Beim Besuch der Webseite: IP-Adresse, Browsertyp, Uhrzeit und aufgerufene Seiten (durch Server-Logs, automatisch durch den Webserver)</li>
            <li>Beim Erstellen einer Postkarte: Die Gestaltung erfolgt ausschließlich lokal im Browser. Es werden dabei keine Daten oder Bilder an den Server übertragen oder gespeichert.</li>
        </ul>

        <h2>3. Verarbeitung der Postkarten-Inhalte</h2>
        <p>
            Die erstellten Postkarten werden ausschließlich im Browser des Nutzers erzeugt. Sie können vom Nutzer gespeichert, gedruckt oder versendet werden, verbleiben jedoch auf dessen Gerät.
            Der Server speichert keine Inhalte, Bilder oder Texte, die in den Postkarten enthalten sind.
        </p>

        <h2>4. Weitergabe von Daten</h2>
        <p>Es erfolgt keine Weitergabe von Inhalten oder personenbezogenen Daten an Dritte, da diese nicht erhoben oder verarbeitet werden.</p>

        <h2>5. Deine Rechte</h2>
        <p>Da keine personenbezogenen Inhalte auf dem Server gespeichert oder verarbeitet werden, ist eine Umsetzung von Rechten wie Auskunft, Berichtigung oder Löschung im Sinne der DSGVO in Bezug auf Postkarteninhalte nicht erforderlich.</p>

        <footer style="margin-top: 40px; text-align: center;">
            <a href="<?= getBaseUrl() ?>">Zurück zur Startseite</a>
        </footer>
    </body>
</html>