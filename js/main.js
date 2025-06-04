let quill;
$(document).ready(function () {
    let selectedBox = null;
    let isSyncingBgSelect = false;
    const Size = Quill.import('formats/size');
    Size.whitelist = ['small', 'normal', 'large'];
    Quill.register(Size, true);
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: {
                container: [
                    [{'size': ['small', 'normal', 'large']}],
                    ['bold', 'italic'],
                    [{'color': []}]
                ],
                handlers: {
                    'size': function (value) {
                        const range = quill.getSelection();
                        if (range == null)
                            return;
                        if (range.length === 0) {
                            // Kein Text markiert: alles ändern
                            quill.formatText(0, quill.getLength(), 'size', value);
                        } else {
                            // Nur Selektion ändern
                            quill.format('size', value);
                        }
                    }
                }
            }
        }
    });
    /*
     * Set font size normal after init
     */
    let hasFirstInput = false;
    quill.on('text-change', function (delta, oldDelta, source) {
        if (!hasFirstInput && quill.getLength() > 1) {
            // Nur, wenn etwas geschrieben wurde und noch keine Größe gesetzt ist
            const range = quill.getSelection();
            if (range) {
                quill.formatText(0, quill.getLength(), {size: 'normal'}, 'user');
            }
            hasFirstInput = true;
        }
    });

    createEmojiPanel(quill);
    
    // Finde die Size-Picker-Elemente
    const toolbar = document.querySelector('.ql-toolbar');
    toolbar.addEventListener('click', function (event) {
        const pickerItem = event.target.closest('.ql-size .ql-picker-item');
        if (pickerItem) {
            // 1. Inline Styles entfernen (Global reset)
            quill.root.querySelectorAll('[style*="font-size"]').forEach(el => el.style.fontSize = null);

            // 2. Neue globale Größe setzen
            let size = pickerItem.dataset.value;
            let px;
            switch (size) {
                case 'small':
                    px = '20px';
                    break;
                case 'large':
                    px = '35px';
                    break;
                default:
                    px = '30px'; // normal
            }
            quill.root.style.fontSize = px;
        }
    });

    quill.on('text-change', function () {
        if (selectedBox) {
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
        // === Hintergrundfarbe synchronisieren ===
        // Hole den aktuellen Background-Color-Wert der Box
        const bgColor = $(selectedBox).css('background-color');
        let matchedValue = null;
        $('#bg-select-text option').each(function () {
            // Beide Strings ohne Leerzeichen vergleichen
            const optVal = $(this).val().replace(/\s+/g, '');
            const boxVal = bgColor.replace(/\s+/g, '');
            if (
                    optVal === boxVal ||
                    (boxVal === "rgba(0,0,0,0)" && optVal === "transparent")
                    ) {
                matchedValue = $(this).val();
                return false;
            }
        });
        if (matchedValue !== null) {
            $('#bg-select-text').val(matchedValue); // .change() NICHT aufrufen!
        } else {
            $('#bg-select-text').prop('selectedIndex', 0);
        }
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
        hasFirstInput = false;
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
            // Vor dem Deselektieren: Quill-Inhalt in die (noch) selektierte Box schreiben
            if (selectedBox) {
                $(selectedBox).find('.text-content').html(quill.root.innerHTML);
            }

            //abwählen
            $('.text-box').removeClass('selected');
            selectedBox = null;
            // Quill-Inhalt löschen
            quill.setText('');

            //Text Select Background auf default zurücksetzen
            $('#bg-select-text').prop('selectedIndex', 0).change();
        }
    });
    
    $(document).on('click', '.text-box .delete-btn', function (e) {
        // verhindert Deselektion
        e.stopPropagation();
        const box = $(this).closest('.text-box');
        // falls das gelöschte Feld gerade aktiv war, reset selectedBox
        if (box[0] === selectedBox) {
            selectedBox = null;
            quill.setText('');
        }
        box.remove();
    });
    
    const filterMap = {
        none: 'none',
        sepia: 'sepia(1)',
        brightness: 'brightness(1.2)',
        contrast: 'contrast(1.4)',
        grayscale: 'grayscale(1)',
        blur: 'blur(2px)',
        huerotate: 'hue-rotate(45deg)'
    };

    document.getElementById('filter-select').addEventListener('change', function (e) {
        const filter = filterMap[e.target.value] || 'none';
        document.getElementById('postcard').style.filter = filter;
    });

    $('#download').click(() => {
        hideDeleteButtons();
        html2canvas(document.querySelector("#postcard"),{ useCORS: true,scale: 1.7 }).then(canvas => {
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
            $('body').append($form); // Temporär ins DOM einfügen
            $form.submit(); // Abschicken
            $form.remove(); // Danach wieder entfernen
            showDeleteButtons();
        });
    });
    
    // Eigenes Hintergrundbild mit crop funktion
    let cropper = null;
    const maxSizeMB = 7;
    const targetWidth = 1200;
    const targetHeight = 800;

    // Modal-Referenzen
    const modal = document.getElementById('cropperModal');
    const cropperImage = document.getElementById('bg-cropper-image');
    const cropBtn = document.getElementById('crop-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    
    function openModal() {
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    }

    document.getElementById('bg-upload').addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file)
            return;

        if (file.size > maxSizeMB * 1024 * 1024) {
            alert(`Die Datei ist zu groß (${(file.size / 1024 / 1024).toFixed(2)} MB). Bitte wähle ein Bild unter ${maxSizeMB} MB.`);
            this.value = ''; // Reset des File-Inputs
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            cropperImage.src = e.target.result;

            cropperImage.onload = function () {
                // Cropper ggf. vorher zerstören
                if (cropper)
                    cropper.destroy();
                cropper = new Cropper(cropperImage, {
                    aspectRatio: targetWidth / targetHeight,
                    viewMode: 1,
                    autoCropArea: 1,
                    movable: true,
                    zoomable: true,
                    scalable: false,
                    rotatable: false
                });
            };

            openModal();
        };
        reader.readAsDataURL(file);
    });

    // Crop übernehmen
    cropBtn.addEventListener('click', function () {
        if (!cropper)
            return;
        const canvas = cropper.getCroppedCanvas({
            width: targetWidth,
            height: targetHeight,
            fillColor: '#fff',
            imageSmoothingQuality: 'high'
        });
        document.getElementById('bg-image').src = canvas.toDataURL('image/jpeg', 0.9);
        closeModal();
    });

    // Modal schließen (Abbrechen)
    cancelBtn.addEventListener('click', function () {
        closeModal();
    });

    // Modal auch mit Klick auf Overlay schließen
    modal.addEventListener('click', function (e) {
        if (e.target === modal)
            closeModal();
    });
    //make .text-box draggable
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
