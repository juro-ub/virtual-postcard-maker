function hideDeleteButtons() {
    $('.delete-btn').hide();
}

function showDeleteButtons() {
    $('.delete-btn').show();
}

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iOS/i.test(navigator.userAgent);
}
