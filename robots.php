<?php
require_once 'init.php';
header('Content-Type: text/plain');

echo "User-agent: *\n";
echo "Disallow:\n";
echo "Sitemap: " . getBaseUrl() . "sitemap.php\n";