<?php

require_once 'init.php';
header('Content-Type: application/xml; charset=utf-8');

$base = getBaseUrl();

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

$pages = [
    '',
    'datenschutz.php',
    'impressum.php'
];

foreach ($pages as $p) {
    echo "  <url>\n";
    echo "    <loc>" . htmlspecialchars($base . $p) . "</loc>\n";
    echo "    <priority>0.8</priority>\n";
    echo "  </url>\n";
}

echo "</urlset>\n";
