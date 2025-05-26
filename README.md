# 💌 Virtueller Postkarten-Generator

Mit diesem Projekt kannst du eigene Postkarten direkt im Browser gestalten und teilen. Die Anwendung läuft komplett lokal im Browser, speichert keine Daten auf dem Server und funktioniert ohne Benutzerkonto.

## ✨ Features

- 📸 Eigene Hintergründe hochladen (werden nicht auf dem Server gespeichert!)
- 📝 Textfelder frei platzierbar und per Drag & Drop verschiebbar
- 🎨 Hintergrundfarben und Emojis einfügbar (Quill-Editor)
- 📱 Mobile Ansicht optimiert
- 🖼️ Vorschau, Download als Bild & Druckfunktion (Desktop)
- 🖨️ Druck auf mobilen Geräten wird automatisch deaktiviert

## 🧱 Tech Stack

- HTML / CSS / JavaScript
- [Quill](https://quilljs.com/) 1.3.7 (Texteditor)
- [interact.js](https://interactjs.io/) (Drag & Drop)
- [html2canvas](https://html2canvas.hertzen.com/) (für Download/Print)
- [Font Awesome](https://fontawesome.com/) (Icons)

## 🚀 Installation

1. Repository klonen oder herunterladen
2. Lokalen Webserver starten (z. B. `php -S localhost:8000`)
3. Im Browser öffnen: [http://localhost:8000](http://localhost:8000)

> 📁 Die Anwendung benötigt keine Datenbank und läuft vollständig ohne Backend-Logik (außer für optionale Druckfunktion per `print.php` auf Desktop).

## 📄 Lizenz

[MIT License](LICENSE)

---

**Hinweis:** Dieses Projekt wurde als reines Hobbyprojekt gestartet und eignet sich ideal als kleines Webtool oder Inspiration für eigene kreative Ideen.