let quill;
$(document).ready(function () {
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

    $('#bg-select').change(function () {
        $('#bg-image').attr('src', 'assets/hintergruende/' + $(this).val());
    });

    function updatePreview() {
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

    $('#save').click(() => {
        updatePreview();
        uploadAndGetLink(link => alert('Gespeichert unter: ' + link));
    });

    $('#share-ws').click(() => {
        updatePreview();
        uploadAndGetLink(link => window.open(`https://wa.me/?text=Hier ist meine Postkarte: ${link}`, '_blank'));
    });

    $('#share-tg').click(() => {
        updatePreview();
        uploadAndGetLink(link => window.open(`https://t.me/share/url?text=Hier ist meine Postkarte: ${link}`, '_blank'));
    });
});