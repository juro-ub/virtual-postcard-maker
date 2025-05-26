let quill;
$(document).ready(function () {
    let selectedBox = null;
    const Size = Quill.import('formats/size');
    Size.whitelist = ['small', 'normal', 'large'];
    Quill.register(Size, true);
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'size': ['small', 'normal', 'large'] }],
                ['bold', 'italic'],
                [{'color': []}],
                ['emoji']
            ],
            "emoji-toolbar": true,
            "emoji-textarea": false,
            "emoji-shortname": true
        }
    });

    quill.on('text-change', function () {
        if (selectedBox) {
            // NUR den .text-content updaten, nicht die ganze Box
            $(selectedBox).find('.text-content').html(quill.root.innerHTML);
        }
    });        

    $('#bg-select').change(function () {
        $('#bg-image').attr('src', 'assets/hintergruende/' + $(this).val());
    });
    
    $(document).on('click', '.text-box', function (e) {
        e.stopPropagation();
        $('.text-box').removeClass('selected');
        $(this).addClass('selected');
        selectedBox = this;

        const html = $(selectedBox).find('.text-content').html();
        quill.root.innerHTML = html;
    });
    
    let textBoxCounter = 0;

    $('#add-textbox').click(function () {
        textBoxCounter++;

        const contentHTML = quill.root.innerHTML;
        
        // Dann Box anlegen, mit getrenntem Content-Container
        const newBox = $(`
        <div class="text-box" contenteditable="false">
          <div class="text-content"></div>
          <div class="delete-btn"><i class="fa-solid fa-xmark"></i></div>
        </div>
        `);

        // Content reinpacken
        newBox.find('.text-content').html(contentHTML);

        newBox.css({
            top: 50 + textBoxCounter * 20 + 'px',
            left: 50 + textBoxCounter * 20 + 'px'
        });                

        $('#postcard').append(newBox);

        // automatisch auswählen + in Quill laden
        selectedBox = newBox[0];
        $('.text-box').removeClass('selected');
        newBox.addClass('selected');

        const selectedBg = $('#bg-select-text').val();
        $(selectedBox).css('background-color', selectedBg);
        quill.root.innerHTML = contentHTML;
    });
    
    $('.editor-wrapper, .ql-toolbar').on('click', function (e) {
        e.stopPropagation();  // verhindert, dass der globale Handler feuert
        if (selectedBox) {
            // einmal alle Boxen “visuell” abwählen, dann die gespeicherte Box wieder auswählen
            $('.text-box').removeClass('selected');
            $(selectedBox).addClass('selected');
        }
    });
    
    $('#bg-select-text').change(function () {
        const value = $(this).val();
        if (selectedBox) {
            $(selectedBox).css('background-color', value);
        }
    });

    $(document).on('click', function (e) {
        if ($(e.target).closest('.text-box, .editor-wrapper, .ql-toolbar, #editor').length === 0) {
            // nur optisch abwählen, selectedBox-Referenz bleibt erhalten
            $('.text-box').removeClass('selected');
        }
    });
    
    $(document).on('click', '.text-box .delete-btn', function (e) {
        e.stopPropagation();               // verhindert Deselektion
        const box = $(this).closest('.text-box');
        // falls das gelöschte Feld gerade aktiv war, reset selectedBox
        if (box[0] === selectedBox) {
            selectedBox = null;
            quill.setText('');
        }
        box.remove();
    });
    
    $('#download').click(() => {
        hideDeleteButtons();
        html2canvas(document.querySelector("#postcard")).then(canvas => {
            const link = document.createElement('a');
            link.download = 'postkarte.jpg';
            link.href = canvas.toDataURL('image/jpeg');
            link.click();
        });
        showDeleteButtons();
    });
    
    $('#print').click(() => {
        hideDeleteButtons();
        html2canvas(document.querySelector('#postcard'), {useCORS: true}).then(canvas => {
            const dataUrl = canvas.toDataURL('image/png');

            const $form = $('<form>', {
                method: 'POST',
                action: 'print.php',
                target: '_blank'
            });

            const $input = $('<input>', {
                type: 'hidden',
                name: 'imageData',
                value: dataUrl
            });

            $form.append($input);
            $('body').append($form);     // Temporär ins DOM einfügen
            $form.submit();              // Abschicken
            $form.remove();              // Danach wieder entfernen
        });
        showDeleteButtons();
    });
    
    // === Eigenes Hintergrundbild – browserbasiert & angepasst ===
    const maxSizeMB = 7;

    $('#bg-upload').on('change', function (e) {
        const file = e.target.files[0];
        if (!file)
            return;

        if (file.size > maxSizeMB * 1024 * 1024) {
            alert(`Die Datei ist zu groß (${(file.size / 1024 / 1024).toFixed(2)} MB). Bitte wähle ein Bild unter ${maxSizeMB} MB.`);
            $(this).val('');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const targetWidth = 1200;
                const targetHeight = 800;

                const canvas = document.createElement('canvas');
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                const ctx = canvas.getContext('2d');
                ctx.fillStyle = "#ffffff"; // Hintergrund (für z.B. transparente PNGs)
                ctx.fillRect(0, 0, targetWidth, targetHeight);

                // Bild einpassen (Seitenverhältnis beibehalten)
                const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
                const newW = img.width * scale;
                const newH = img.height * scale;
                const offsetX = (targetWidth - newW) / 2;
                const offsetY = (targetHeight - newH) / 2;

                ctx.drawImage(img, offsetX, offsetY, newW, newH);

                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                $('#bg-image').attr('src', dataUrl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    /*
     * 
     * Kleine Hacks für das Emoji Menü in Quill
     **/
    
    function injectEmojiCloseButton() {
        const palette = document.getElementById('emoji-palette');

        if (!palette || palette.querySelector('.custom-emoji-close'))
            return;
        
        const closeBtn = document.createElement('div');
        closeBtn.className = 'custom-emoji-close';
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        closeBtn.title = 'Emoji-Menü schließen';

        closeBtn.addEventListener('click', () => {
            document.querySelector('.ql-emoji').click();
        });

        palette.appendChild(closeBtn);
    }
    
    document.querySelector('.ql-emoji').addEventListener('click', () => {
        setTimeout(injectEmojiCloseButton, 50); // Emoji-Palette wird leicht verzögert erzeugt
    });

    // Beobachte, ob Emoji-Menü geöffnet wird
    $(document).on('click', '.ql-emoji', function () {
        const closeDiv = document.getElementById('emoji-close-div');
        if (closeDiv) {
            closeDiv.style.pointerEvents = 'auto'; // Aktiviert Klick zum Schließen
            closeDiv.style.zIndex = '9999';        // Liegt über Quill-Toolbar
        }
    });

    $(document).on('click', function (e) {
        const palette = document.getElementById('emoji-palette');

        // Prüfen ob offen und Klick außerhalb
        if (
                palette &&
                palette.style.display !== 'none' &&
                !palette.contains(e.target) &&
                !e.target.closest('.ql-emoji')
                ) {
            // Simuliere zweiten Klick auf das Emoji-Icon → schließt korrekt
            document.querySelector('.ql-emoji').click();
        }
    });
    
    interact('.text-box').draggable({
        listeners: {
            start(event) {
                const style = window.getComputedStyle(event.target);
                event.target.setAttribute('data-x', parseInt(style.left) || 0);
                event.target.setAttribute('data-y', parseInt(style.top) || 0);
            },
            move(event) {
                const target = event.target;

                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // Begrenzung auf Containergröße
                const container = document.querySelector('#postcard');
                const maxX = container.clientWidth - target.offsetWidth;
                const maxY = container.clientHeight - target.offsetHeight;
                x = Math.max(0, Math.min(x, maxX));
                y = Math.max(0, Math.min(y, maxY));

                target.style.left = `${x}px`;
                target.style.top = `${y}px`;

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end(event) {
                event.target.classList.remove('dragging');
            }
        },
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: '#postcard',
                endOnly: true
            })
        ],
        inertia: true
    });


});
