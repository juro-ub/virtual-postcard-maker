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

- HTML / CSS / JavaScript (Vanilla)
- [npm](https://www.npmjs.com/) – für Verwaltung und Installation der Frontend-Bibliotheken
- [Quill](https://quilljs.com/) 1.3.7 – moderner WYSIWYG-Texteditor
- [interact.js](https://interactjs.io/) – Drag & Drop & Resize-Funktionalität
- [html2canvas](https://html2canvas.hertzen.com/) – Screenshot- & Download/Print-Funktion
- [Font Awesome](https://fontawesome.com/) (Icons, via npm)

## Installation

### Voraussetzungen

- Node.js (empfohlen: aktuelle LTS-Version)
- npm (Node Package Manager)
- Apache-Webserver mit Unterstützung für Virtual Hosts
- Git (optional, für den Projekt-Download)

### 1. Repository herunterladen

Klonen des Projekts (alternativ als ZIP herunterladen und entpacken):

```bash
git clone https://github.com/juro-ub/virtual-postcard-maker.git
cd virtual-postcard-maker
```

### 2. Abhängigkeiten installieren

```bash
npm install
```
Alle benötigten Bibliotheken werden installiert und die JavaScript/CSS-Bibliotheken automatisch kopiert.

### 3. Apache Virtual Host einrichten

Füge in deiner lokalen Apache-Konfiguration (z.B. `/etc/apache2/sites-available/virtual-postcard-maker.local.conf`) einen neuen Virtual Host hinzu:

```apache
<VirtualHost *:80>
    ServerName virtual-postcard-maker.local
    DocumentRoot /pfad/zum/projektordner/virtual-postcard-maker

    <Directory /pfad/zum/projektordner/virtual-postcard-maker>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```
Passe `/pfad/zum/projektordner/virtual-postcard-maker` an deinen lokalen Pfad an!

Danach folgende Befehle ausführen:

```bash
sudo a2ensite virtual-postcard-maker.local.conf
sudo systemctl reload apache2
```

Ergänze außerdem die folgende Zeile in deiner lokalen `hosts`-Datei (`/etc/hosts` unter Linux/Mac, `C:\Windows\System32\drivers\etc\hosts` unter Windows):

```
127.0.0.1    virtual-postcard-maker.local
```

### 4. Projekt aufrufen

Rufe [http://virtual-postcard-maker.local](http://virtual-postcard-maker.local) in deinem Browser auf.

---

**Hinweise:**

- Führe bei Änderungen an den npm-Abhängigkeiten erneut `npm install` aus.
- Die kopierten Bibliotheken findest du unter `js/lib/`, `css/lib/` und `css/fonts/` (je nach Konfiguration).
- Für andere Webserver (z.B. nginx) ist die Konfiguration entsprechend anzupassen.

## 📄 Lizenz

[MIT License](LICENSE)

---

**Hinweis:** Dieses Projekt wurde als reines Hobbyprojekt gestartet und eignet sich ideal als kleines Webtool oder Inspiration für eigene kreative Ideen.
Die Anwendung benötigt keine Datenbank und läuft vollständig ohne Backend-Logik (außer für optionale Druckfunktion per `print.php` auf Desktop
