const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const express = require('express');



function buttonDB(inputUsername, inputPassword){

// Verbindung zur Datenbank herstellen (Datei: 'example.db')
// Die Datenbank wird erstellt, falls sie noch nicht existiert
const db = new sqlite3.Database('Datenbank.db', (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank:', err.message);
    } else {
        console.log('Verbindung zur SQLite-Datenbank erfolgreich!');
    }
});

    return new Promise((resolve, reject) => {
        // SQL-Abfrage: Überprüfe, ob es einen Eintrag gibt, der beiden Kriterien entspricht
        const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
        db.get(query, [username, password], (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                // Ein passender Benutzer wurde gefunden
                resolve(true);
            } else {
                // Kein passender Benutzer gefunden
                resolve(false);
            }
        });
    });
}

// Verbindung zur Datenbank schließen
db.close((err) => {
    if (err) {
        console.error('Fehler beim Schließen der Datenbank:', err.message);
    } else {
        console.log('Datenbankverbindung geschlossen.');
    }
});





/*
    // Tabelle erstellen (falls nicht existiert)
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Fehler beim Erstellen der Tabelle:', err.message);
        } else {
            console.log('Tabelle erfolgreich erstellt oder bereits vorhanden.');
        }
    });

    // Beispiel-Daten einfügen
    db.run(`INSERT INTO users (name, age) VALUES (?, ?)`, ['Alice', 30], (err) => {
        if (err) {
            console.error('Fehler beim Einfügen der Daten:', err.message);
        } else {
            console.log('Daten erfolgreich eingefügt.');
        }
    });
*/










// Pfad zur SQLite-Datenbank-Datei
const dbPath = path.resolve(__dirname, '../datenbank.db');

// Verbindung zur SQLite-Datenbank herstellen
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der SQLite-Datenbank:', err.message);
    } else {
        console.log('Verbindung zur SQLite-Datenbank hergestellt.');
    }
});

// Beispiel: Abfrage ausführen
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)`);
    db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, ['Max Mustermann', 'max@example.com']);
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            console.error('Fehler beim Abrufen der Daten:', err.message);
        } else {
            console.log('Abgerufene Daten:', rows);
        }
    });
});

// Datenbankverbindung schließen
// (optional, wenn der Zugriff beendet ist)
db.close((err) => {
    if (err) {
        console.error('Fehler beim Schließen der Datenbank:', err.message);
    } else {
        console.log('SQLite-Datenbankverbindung geschlossen.');
    }
});
