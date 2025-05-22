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
            selectedBox.innerHTML = quill.root.innerHTML;
        }
    });

    $('#bg-select').change(function () {
        $('#bg-image').attr('src', 'assets/hintergruende/' + $(this).val());
    });

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

    function updatePreview() {
        alert("f");
        $('#message-preview').html(quill.root.innerHTML);
    }

    function uploadAndGetLink(callback) {
        html2canvas(document.querySelector("#postcard")).then(canvas => {
            canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append('image', blob, 'postkarte.png');
                fetch('save.php', { method: 'POST', body: formData })
                    .then(res => res.text()).then(callback);
            });
        });
    }

    $('#share-ws').click(() => {
        updatePreview();
        uploadAndGetLink(link => window.open(`https://wa.me/?text=Hier ist meine Postkarte: ${link}`, '_blank'));
    });

    $('#share-tg').click(() => {
        updatePreview();
        uploadAndGetLink(link => window.open(`https://t.me/share/url?text=Hier ist meine Postkarte: ${link}`, '_blank'));
    });

    $('#bg-select-text').change(function () {
        const value = $(this).val();
        $('#message-preview').css('background-color', value);
    });
    
    $(document).on('click', '.text-box', function (e) {
        e.stopPropagation();
        $('.text-box').removeClass('selected');
        $(this).addClass('selected');

        selectedBox = this;
        quill.root.innerHTML = selectedBox.innerHTML;
        $('#editor-panel').show();
    });
    
    let textBoxCounter = 0;

    $('#add-textbox').click(function () {
        textBoxCounter++;

        const newBox = $(`<div class="text-box" contenteditable="false">${quill.root.innerHTML}</div>`);

        newBox.css({
            top: 50 + textBoxCounter * 20 + 'px',
            left: 50 + textBoxCounter * 20 + 'px'
        });

        $('#postcard').append(newBox);
        makeDraggable(newBox[0]);

        // automatisch auswählen + in Quill laden
        selectedBox = newBox[0];
        quill.root.innerHTML = selectedBox.innerHTML;
        $('#editor-panel').show();
    });
    
    $('#editor-wrapper').on('click', function (e) {
        e.stopPropagation(); // ← verhindert Deselect!
    });
    
    makeDraggable(document.getElementById("message-preview"));
});
