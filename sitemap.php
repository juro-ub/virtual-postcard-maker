<?php

require_once 'init.php';
header('Content-Type: application/xml; charset=utf-8');

$baseUrl = getBaseUrl();
$staticPages = [
    '', // index.php
    'datenschutz.php',
    'impressum.php'
];

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

// Statische Seiten
foreach ($staticPages as $page) {
    echo "  <url>\n";
    echo "    <loc>" . htmlspecialchars($baseUrl . $page) . "</loc>\n";
    echo "    <priority>0.8</priority>\n";
    echo "  </url>\n";
}

echo "</urlset>\n";
