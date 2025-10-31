<?php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

echo "GOOGLE_CLIENT_ID: " . env('GOOGLE_CLIENT_ID') . PHP_EOL;
