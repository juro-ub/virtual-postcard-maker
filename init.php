<?php

function getBaseUrl(): string {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
    $host = $_SERVER['HTTP_HOST'];
    $path = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    return $protocol . $host . $path . '/';
}

function assetUrl($path) {
    $fullPath = __DIR__ . '/' . $path;
    $timestamp = file_exists($fullPath) ? filemtime($fullPath) : time(); // fallback bei Fehler
    return getBaseUrl() . $path . '?v=' . $timestamp;
}

?>