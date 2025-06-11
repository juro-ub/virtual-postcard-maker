function createEmojiPanel(quill, options) {
    options = options || {};

    // Kategorien mit Emojis, als Emoji-Icon als Key
    var emojiCategories = options.emojiCategories || {
        "😀": [// Smileys & Emotionen
            '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚',
            '🙂', '🤗', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢',
            '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤔', '🤭', '🤫', '🤥'
        ],
        "👍": [// Gesten & Hände
            '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '👊', '✊', '👏', '🙌', '👐', '🙏', '🤲', '🤝', '🤙', '💪', '🖖', '🫶'
        ],
        "🐶": [// Tiere
            '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦄', '🐔', '🐧', '🐦'
        ],
        "🍏": [// Essen & Trinken
            '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥭', '🥥', '🥝', '🍅', '🍆', '🥑',
            '🍔', '🍟', '🍕', '🌭', '🥪', '🥗', '🍿', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍦', '🍨', '🍧', '🍫', '🍬'
        ],
        "⚽": [// Aktivitäten & Symbole
            '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🥅', '🏒', '🏑', '🏏', '🥍', '🏹', '🎣',
            '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🎻', '🎬', '🎮', '🕹️', '🎲', '♟️', '🎯', '🎳', '🧩'
        ],
        "🎉": [// Feste & Liebe
            '🎉', '🎊', '🎈', '🎂', '🎁', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '💕', '💞', '💓', '💗'
        ],
        "🇩🇪": [// Flaggen
            '🇩🇪', '🇦🇹', '🇨🇭', '🇪🇺', '🇫🇷', '🇬🇧', '🇺🇸', '🇮🇹', '🇪🇸', '🇵🇱'
        ],
        "✨": [// Symbole
            '✨', '🔥', '🌟', '⭐', '🌈', '☀️', '🌙', '☁️', '⚡', '💥', '💦', '💨', '🕊️', '🦋', '🌹', '🌺', '🌻', '🌼'
        ]
    };

    var toolbarContainer = quill.container.previousSibling;

    // Emoji Button (Toolbar)
    var emojiButton = document.createElement('span');
    emojiButton.className = 'ql-emoji-picker';
    emojiButton.innerHTML = '😊';
    emojiButton.style.cursor = 'pointer';
    emojiButton.style.position = 'relative';

    // Emoji Panel
    var emojiPanel = document.createElement('div');
    emojiPanel.className = 'emoji-panel';
    emojiPanel.style.display = 'none';
    emojiPanel.style.position = 'absolute';
    emojiPanel.style.background = '#fff';
    emojiPanel.style.border = '1px solid #ccc';
    emojiPanel.style.zIndex = '1000';
    emojiPanel.style.padding = '8px';
    emojiPanel.style.borderRadius = '4px';
    emojiPanel.style.width = '350px';
    emojiPanel.style.boxSizing = 'border-box';
    emojiPanel.style.userSelect = 'none';
    emojiPanel.style.maxHeight = '320px';
    emojiPanel.style.overflow = 'hidden';

    // Tabs Container
    var categoryTabs = document.createElement('div');
    categoryTabs.style.display = 'flex';
    categoryTabs.style.justifyContent = 'center';
    categoryTabs.style.gap = '6px';
    categoryTabs.style.marginBottom = '8px';
    categoryTabs.style.flexWrap = 'wrap';
    categoryTabs.style.borderBottom = '1px solid #0d6efd';
    categoryTabs.style.height = '50px';

    // Emojis Container
    var emojisContainer = document.createElement('div');
    emojisContainer.style.display = 'flex';
    emojisContainer.style.flexWrap = 'wrap';
    emojisContainer.style.gap = '6px';
    emojisContainer.style.maxHeight = '250px';
    emojisContainer.style.overflowY = 'auto';

    // Hilfsfunktion: Emojis einer Kategorie anzeigen
    function showCategory(emojis) {
        emojisContainer.innerHTML = '';
        emojis.forEach(function (emoji) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.innerText = emoji;
            btn.style.fontSize = '1.4em';
            btn.style.border = 'none';
            btn.style.background = 'none';
            btn.style.cursor = 'pointer';
            btn.style.padding = '4px 6px';
            btn.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                var range = quill.getSelection(true);
                if (range) {
                    quill.insertText(range.index, emoji, 'user');
                    quill.setSelection(range.index + emoji.length, 0);
                }
                // Panel bleibt offen, deshalb hier kein schließen
            };
            emojisContainer.appendChild(btn);
        });
    }

    // Tabs erstellen und erstes aktiv setzen
    var first = true;
    for (const catEmoji in emojiCategories) {
        var tabBtn = document.createElement('button');
        tabBtn.type = 'button';
        tabBtn.innerText = catEmoji;
        // Optional: title als Kategorie-Name
        var titles = {
            "😀": "Smileys & Emotionen",
            "👍": "Gesten & Hände",
            "🐶": "Tiere",
            "🍏": "Essen & Trinken",
            "⚽": "Aktivitäten & Symbole",
            "🎉": "Feste & Liebe",
            "🇩🇪": "Flaggen",
            "✨": "Symbole"
        };
        tabBtn.title = titles[catEmoji] || "Kategorie";

        tabBtn.style.fontSize = '1.5em';
        tabBtn.style.border = 'none';
        tabBtn.style.background = 'none';
        tabBtn.style.cursor = 'pointer';
        tabBtn.style.padding = '4px 8px';
        tabBtn.style.borderBottom = '3px solid transparent';

        if (first) {
            showCategory(emojiCategories[catEmoji]);
            first = false;
        }

        tabBtn.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            // Alle Tabs resetten
            Array.from(categoryTabs.children).forEach(function (sibling) {
                sibling.style.borderBottomColor = 'transparent';
            });
            showCategory(emojiCategories[catEmoji]);
            // Panel bleibt offen
        };

        categoryTabs.appendChild(tabBtn);
    }

    emojiPanel.appendChild(categoryTabs);
    emojiPanel.appendChild(emojisContainer);

    emojiButton.onclick = function (e) {
        e.preventDefault();
        emojiPanel.style.display = emojiPanel.style.display === 'none' ? 'block' : 'none';
        emojiPanel.style.left = '0px';
        emojiPanel.style.top = (emojiButton.offsetHeight + 2) + 'px';
    };

    emojiButton.appendChild(emojiPanel);
    toolbarContainer.appendChild(emojiButton);

    emojiButton.onmousedown = function (e) {
        e.stopPropagation(); // Panel bleibt offen bei Klick auf Button
    };

    document.addEventListener('mousedown', function (event) {
        if (!emojiButton.contains(event.target) && !emojiPanel.contains(event.target)) {
            emojiPanel.style.display = 'none';
        }
    });
}

// Helferfunktion: Emojis aus emojis.json laden und Panel erzeugen
function loadEmojisAndCreatePanel(quill) {
    fetch('emojis.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (emojis) {
                createEmojiPanel(quill, {emojiCategories: emojis});
            })
            .catch(function () {
                // Fallback: Panel mit Default-Kategorien anzeigen
                createEmojiPanel(quill);
            });
}
