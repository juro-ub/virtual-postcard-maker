// Emoji-Panel für Quill - Vanilla JS, kein Modul, keine Klasse, kein import/export!
//
// Benutzung: Nach Quill-Initialisierung einfach aufrufen:
// createEmojiPanel(quill);

function createEmojiPanel(quill, options) {
    options = options || {};
    var emojis = options.emojis || ['😀', '😂', '😍', '👍', '🎉', '❤️', '🔥', '🙌', '🤔', '🥳', '😎', '😡', '🙏', '😉', '😁', '😅', '🤩'];

    // Toolbar finden
    var toolbarContainer = quill.container.previousSibling;

    // Emoji-Button
    var emojiButton = document.createElement('span');
    emojiButton.className = 'ql-emoji-picker';
    emojiButton.innerHTML = '😊';
    emojiButton.style.cursor = 'pointer';

    // Panel
    var emojiPanel = document.createElement('div');
    emojiPanel.className = 'emoji-panel';
    emojiPanel.style.display = 'none';
    emojiPanel.style.position = 'absolute';
    emojiPanel.style.background = '#fff';
    emojiPanel.style.border = '1px solid #ccc';
    emojiPanel.style.zIndex = '1000';
    emojiPanel.style.padding = '4px 8px';
    emojiPanel.style.borderRadius = '4px';
    emojiPanel.style.whiteSpace = 'nowrap';

    emojis.forEach(function (emoji) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.innerText = emoji;
        btn.style.fontSize = '1.3em';
        btn.style.border = 'none';
        btn.style.background = 'none';
        btn.style.cursor = 'pointer';
        btn.style.padding = '2px 4px';
        btn.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var range = quill.getSelection(true);
            if (range) {
                quill.insertText(range.index, emoji, 'user');
                quill.setSelection(range.index + emoji.length, 0);
            }
            emojiPanel.style.display = 'none';
        };
        emojiPanel.appendChild(btn);
    });

    emojiButton.onclick = function (e) {
        e.preventDefault();
        // Panel anzeigen/verstecken und direkt UNTER dem Button ausrichten
        emojiPanel.style.display = emojiPanel.style.display === 'none' ? 'grid' : 'none';
        const rect = emojiButton.getBoundingClientRect();
        emojiPanel.style.left = "0px";
        emojiPanel.style.top = (emojiButton.offsetHeight + 2) + "px";
    };

    emojiButton.appendChild(emojiPanel);
    toolbarContainer.appendChild(emojiButton);

    emojiButton.onmousedown = function(e) {
        e.stopPropagation(); // Panel bleibt offen, wenn Button geklickt wird
    };

    document.addEventListener('mousedown', function (event) {
        // Panel schließen, wenn weder Button noch Panel angeklickt wurde
        if (!emojiButton.contains(event.target) && !emojiPanel.contains(event.target)) {
            emojiPanel.style.display = 'none';
        }
    });
}
