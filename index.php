<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Virtuelle Postkarte</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
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
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>