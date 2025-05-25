function hideDeleteButtons() {
    $('.delete-btn').hide();
}

function showDeleteButtons() {
    $('.delete-btn').show();
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
