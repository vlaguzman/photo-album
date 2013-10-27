<?php
if ($_POST) {
    define('UPLOAD_DIR', 'photos/');
    $img = $_POST['image'];
    $filename = $_POST['filename'];
    $img = str_replace('data:image/jpeg;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = UPLOAD_DIR . $filename . '.jpg';
    $success = file_put_contents($file, $data);
    print $success ? $file : 'Unable to save the file.';
}