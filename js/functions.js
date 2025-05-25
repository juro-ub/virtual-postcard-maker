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
