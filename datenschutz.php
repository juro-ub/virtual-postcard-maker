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

        <p>Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Diese Webseite dient ausschließlich der Erstellung und dem Teilen virtueller Postkarten. Dabei gelten folgende Grundsätze:</p>

        <h2>1. Verantwortlich für die Datenverarbeitung</h2>
        <p>
            Julian Rost<br>
            Tübingen, Deutschland<br>
            E-Mail: <a href="mailto:julianrost20@gmail.com">julianrost20@gmail.com</a>
        </p>

        <h2>2. Erhobene Daten</h2>
        <ul>
            <li>Beim Besuch der Webseite: IP-Adresse, Browsertyp, Uhrzeit und aufgerufene Seiten (durch Server-Logs, automatisch durch den Webserver)</li>
            <li>Beim Erstellen einer Postkarte: Das resultierende Bild wird auf dem Server gespeichert</li>
        </ul>

        <h2>3. Speicherung und Inhalte der Postkarten</h2>
        <p>
            Beim Erstellen einer Postkarte wird das gestaltete Bild dauerhaft auf dem Server gespeichert, um es teilen oder herunterladen zu können. Der Inhalt der Postkarte wird ausschließlich vom Nutzer bestimmt.
            Es kann nicht ausgeschlossen werden, dass in den erstellten Bildern personenbezogene Informationen enthalten sind (z. B. Namen, Texte, Fotos).
        </p>
        <p>
            Eine automatisierte Analyse, Verknüpfung mit anderen Daten oder Weitergabe dieser Inhalte erfolgt nicht. Da keine personenbezogene Zuordnung gespeichert wird, ist eine individuelle Auskunft, Berichtigung oder Löschung nach DSGVO nicht möglich.
        </p>

        <h2>4. Weitergabe von Daten</h2>
        <p>Es erfolgt keine Weitergabe der von dir erzeugten Inhalte an Dritte. Die geteilten Links sind öffentlich zugänglich, aber nicht auffindbar.</p>

        <h2>5. Deine Rechte</h2>
        <p>Du hast gemäß DSGVO grundsätzlich das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner personenbezogenen Daten. Da jedoch keine Verknüpfung zwischen dir und den gespeicherten Bildern hergestellt wird, ist die Umsetzung dieser Rechte im Zusammenhang mit erstellten Postkarten nicht möglich.</p>

        <footer style="margin-top: 40px; text-align: center;">
            <a href="<?= getBaseUrl() ?>">Zurück zur Startseite</a>
        </footer>
    </body>
</html>