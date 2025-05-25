function hideDeleteButtons() {
    $('.delete-btn').hide();
}

function showDeleteButtons() {
    $('.delete-btn').show();
}

function makeDraggable(el, containerSelector = '#postcard') {
    const container = document.querySelector(containerSelector);
    let pos = {x: 0, y: 0, left: 0, top: 0};

    function startDrag(clientX, clientY) {
        pos.x = clientX;
        pos.y = clientY;
        pos.left = el.offsetLeft;
        pos.top = el.offsetTop;
    }

    function onDrag(clientX, clientY) {
        let dx = clientX - pos.x;
        let dy = clientY - pos.y;

        let newLeft = pos.left + dx;
        let newTop = pos.top + dy;

        const maxLeft = container.clientWidth - el.clientWidth;
        const maxTop = container.clientHeight - el.clientHeight;

        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";
    }

    function stopDrag() {
        document.onmousemove = null;
        document.onmouseup = null;
        document.ontouchmove = null;
        document.ontouchend = null;
    }

    el.onmousedown = function (e) {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);

        document.onmousemove = function (e) {
            onDrag(e.clientX, e.clientY);
        };
        document.onmouseup = stopDrag;
    };

    el.ontouchstart = function (e) {
        if (e.touches.length === 1) {
            startDrag(e.touches[0].clientX, e.touches[0].clientY);

            document.ontouchmove = function (e) {
                if (e.touches.length === 1) {
                    onDrag(e.touches[0].clientX, e.touches[0].clientY);
                }
            };
            document.ontouchend = stopDrag;
        }
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
