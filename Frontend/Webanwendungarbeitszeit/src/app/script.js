document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
    }
);