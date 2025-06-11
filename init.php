<?php

// Sprachen-Array mit Unicode-Flaggen
$supported_languages = [
    'de' => ['name' => 'Deutsch', 'flag' => '🇩🇪'],
    'en' => ['name' => 'English', 'flag' => '🇬🇧'],
    'fr' => ['name' => 'Français', 'flag' => '🇫🇷'],
    'es' => ['name' => 'Español', 'flag' => '🇪🇸'],
];
$current_lang = isset($_GET['lang']) ? $_GET['lang'] : 'de';
if (!isset($supported_languages[$current_lang])) {
    $current_lang = 'de';
}

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

function loadTranslations($lang = 'de') {
    $file = __DIR__ . "/lang/lang_$lang.xml";
    if (!file_exists($file)) {
        $file = __DIR__ . "/lang/lang_de.xml"; // Fallback zu Deutsch
    }
    $xml = simplexml_load_file($file);
    $translations = [];
    foreach ($xml->item as $item) {
        $key = (string) $item['key'];
        $translations[$key] = (string) $item;
    }
    return $translations;
}

function t($key) {
    static $translations = null;
    if ($translations === null) {
        // Sprache ggf. aus Session, Cookie oder GET-Parameter bestimmen
        $lang = isset($_GET['lang']) ? $_GET['lang'] : 'de';
        $translations = loadTranslations($lang);
    }
    return isset($translations[$key]) ? $translations[$key] : $key;
}

?>
