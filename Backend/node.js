const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const express = require('express');



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
