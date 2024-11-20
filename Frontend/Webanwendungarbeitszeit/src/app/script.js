document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // Hier könntest du eine Validierung oder Authentifizierung durchführen
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    it('Get html', function(done) {
        request('localhost', function(err, res, body) {
          assert.equal(body, 'html');
          done();
        });
      });

    // Beispielvalidierung (einfacher Check)
    if (email && password) {
        // Login erfolgreich
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
    } else {
        alert('Bitte Email und Passwort eingeben.');
    }
});