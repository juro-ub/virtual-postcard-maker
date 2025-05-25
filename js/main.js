function hideDeleteButtons() {
    $('.delete-btn').hide();
}

function showDeleteButtons() {
    $('.delete-btn').show();
}

function makeDraggable(el, containerSelector = '#postcard') {
    const container = document.querySelector(containerSelector);
    let pos = {x: 0, y: 0, left: 0, top: 0};

    el.onmousedown = function (e) {
        e.preventDefault();
        pos.x = e.clientX;
        pos.y = e.clientY;
        pos.left = el.offsetLeft;
        pos.top = el.offsetTop;

        document.onmousemove = function (e) {
            let dx = e.clientX - pos.x;
            let dy = e.clientY - pos.y;

            // Berechne neue Position
            let newLeft = pos.left + dx;
            let newTop = pos.top + dy;

            // Begrenzung auf Container
            const maxLeft = container.clientWidth - el.clientWidth;
            const maxTop = container.clientHeight - el.clientHeight;

            newLeft = Math.max(0, Math.min(newLeft, maxLeft));
            newTop = Math.max(0, Math.min(newTop, maxTop));

            el.style.left = newLeft + "px";
            el.style.top = newTop + "px";
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

function uploadAndGetLink(callback) {
    hideDeleteButtons();
    html2canvas(document.querySelector("#postcard"), {useCORS: true}).then(canvas => {
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('image', blob, 'postkarte.jpg');

            fetch('save.php', {
                method: 'POST',
                body: formData
            })
                    .then(res => res.text())
                    .then(link => {
                        showDeleteButtons(); // Nach dem Screenshot wieder anzeigen
                        callback(link);
                    });
        });
    });
}


let quill;
$(document).ready(function () {
    let selectedBox = null;
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
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

    $('#whatsapp').click(() => {
      uploadAndGetLink(link => {
        const text = `Hier ist meine virtuelle Postkarte: ${link}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      });
    });

    $('#telegram').click(() => {
      uploadAndGetLink(link => {
        const text = `Hier ist meine virtuelle Postkarte: ${link}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`, '_blank');
      });
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
          <div class="delete-btn">×</div>
        </div>
        `);

        // Content reinpacken
        newBox.find('.text-content').html(contentHTML);

        newBox.css({
            top: 50 + textBoxCounter * 20 + 'px',
            left: 50 + textBoxCounter * 20 + 'px'
        });                

        $('#postcard').append(newBox);
        makeDraggable(newBox[0]);

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
        const postcardHtml = document.querySelector('#preview-wrapper').outerHTML;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'print.php';
        form.target = '_blank';

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'html';
        input.value = postcardHtml;

        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    });
    
    $('#email').click(() => {
        uploadAndGetLink(link => {
            const subject = "Meine Postkarte für dich!";
            const body = `Hier ist meine virtuelle Postkarte:\n\n${link}`;
            window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    });

});
