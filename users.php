<?php
header('Content-Type: application/json');

// Simple stockage dans un fichier JSON (pas sécurisé, juste pour test)
define('USER_FILE', 'users.json');

$input = json_decode(file_get_contents('php://input'), true);
$action = $_GET['action'] ?? '';

if (!file_exists(USER_FILE)) {
    file_put_contents(USER_FILE, json_encode([]));
}

$users = json_decode(file_get_contents(USER_FILE), true);

function saveUsers($users) {
    file_put_contents(USER_FILE, json_encode($users));
}

if ($action === 'register') {
    $username = trim($input['username'] ?? '');
    $password = trim($input['password'] ?? '');

    if (!$username || !$password) {
        echo json_encode(['success' => false, 'message' => 'Champs manquants.']);
        exit;
    }

    if (isset($users[$username])) {
        echo json_encode(['success' => false, 'message' => 'Nom d\'utilisateur déjà pris.']);
        exit;
    }

    // Stockage simple (md5 est faible, préférez password_hash en vrai)
    $users[$username] = md5($password);
    saveUsers($users);
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'login') {
    $username = trim($input['username'] ?? '');
    $password = trim($input['password'] ?? '');

    if (!$username || !$password) {
        echo json_encode(['success' => false, 'message' => 'Champs manquants.']);
        exit;
    }

    if (!isset($users[$username])) {
        echo json_encode(['success' => false, 'message' => 'Utilisateur non trouvé.']);
        exit;
    }

    if ($users[$username] !== md5($password)) {
        echo json_encode(['success' => false, 'message' => 'Mot de passe incorrect.']);
        exit;
    }

    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Action inconnue.']);
