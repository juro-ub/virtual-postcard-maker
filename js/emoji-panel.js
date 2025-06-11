function createEmojiPanel(quill, options) {
    options = options || {};

    // Emoji-Kategorien kommen nur aus options
    var emojiCategories = options.emojiCategories;
    if (!emojiCategories) {
        console.error("emojiCategories müssen übergeben werden!");
        return; // Abbruch, keine Fallbacks
    }

    var toolbarContainer = quill.container.previousSibling;

    var emojiButton = document.createElement('span');
    emojiButton.className = 'ql-emoji-picker';
    emojiButton.innerHTML = '😊';

    var emojiPanel = document.createElement('div');
    emojiPanel.className = 'emoji-panel';

    var categoryTabs = document.createElement('div');
    categoryTabs.className = 'category-tabs';

    var emojisContainer = document.createElement('div');
    emojisContainer.className = 'emojis-container';

    function showCategory(emojis) {
        emojisContainer.innerHTML = '';
        emojis.forEach(function (emoji) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.innerText = emoji;
            btn.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                var range = quill.getSelection(true);
                if (range) {
                    quill.insertText(range.index, emoji, 'user');
                    quill.setSelection(range.index + emoji.length, 0);
                }
            };
            emojisContainer.appendChild(btn);
        });
    }

    var first = true;
    for (const catEmoji in emojiCategories) {
        var tabBtn = document.createElement('button');
        tabBtn.type = 'button';
        tabBtn.innerText = catEmoji;

        tabBtn.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();

            Array.from(categoryTabs.children).forEach(function (sibling) {
                sibling.classList.remove('active');
            });
            tabBtn.classList.add('active');

            showCategory(emojiCategories[catEmoji]);
        };

        if (first) {
            tabBtn.classList.add('active');
            showCategory(emojiCategories[catEmoji]);
            first = false;
        }

        categoryTabs.appendChild(tabBtn);
    }

    emojiPanel.appendChild(categoryTabs);
    emojiPanel.appendChild(emojisContainer);

    emojiButton.onclick = function (e) {
        e.preventDefault();
        emojiPanel.classList.toggle('open');
        emojiPanel.style.left = '0px';
        emojiPanel.style.top = (emojiButton.offsetHeight + 2) + 'px';
    };

    emojiButton.onmousedown = function (e) {
        e.stopPropagation();
    };

    document.addEventListener('mousedown', function (event) {
        if (!emojiButton.contains(event.target) && !emojiPanel.contains(event.target)) {
            emojiPanel.classList.remove('open');
        }
    });

    emojiButton.appendChild(emojiPanel);
    toolbarContainer.appendChild(emojiButton);
}

// Helferfunktion: Emojis aus emojis.json laden und Panel erzeugen
function loadEmojisAndCreatePanel(quill) {
    fetch('js/emojis.json')
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
