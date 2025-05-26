document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    document.getElementById('message').textContent = 'Veuillez remplir tous les champs.';
    return;
  }

  // Envoi des données au serveur PHP
  const response = await fetch('users.php?action=register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (result.success) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').textContent = 'Inscription réussie ! Vous pouvez vous connecter.';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').textContent = result.message;
  }
});
