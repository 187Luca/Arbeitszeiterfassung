const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const express = require('express');


//Login Datenbankabgleich
function buttonDB(inputUsername, inputPassword){
//Verbindung zu DB 
const db = new sqlite3.Database('Datenbank.db', (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank:', err.message);
    } else {
        console.log('Verbindung zur SQLite-Datenbank erfolgreich!');
    }
});

    return new Promise((resolve, reject) => {
        // SQL-Abfrage: Überprüfe, ob es einen Eintrag gibt, der eingegebenen Username + Passwort entspricht 
        const query = `SELECT * FROM Users WHERE username = ? AND password = ?`;
        //Username + Passwort werden in die "?" eingetragen für den Vergleich / query ist eine Variable, die SQL-Abfrage enthält
        db.get(query, [inputUsername, inputPassword], (err, row) => {
            if (err) {
                // Falls ein Fehler auftritt (z.B. Syntaxfehler)
                reject(err);
            } else if (row) {
                // Ein passender Benutzer (Username + Passwort) wurde gefunden / "row" ist nicht leer = Übereinstimmung gefunden
                resolve(true);
            } else {
                // Kein passender Benutzer (Username + Passwort) gefunden / "row" ist undifined = keine Übereinstimmung gefunden 
                resolve(false);
            }
        });
    });
}
// Verbindung zur DB schließen (Außerhalb der Funktion, da Verbidnung sonst sofort nach Abfrage geschlossen werden würde, obwohl Abfrage noch läuft / Wichtig bei "db.get")
db.close((err) => {
    if (err) {
        console.error('Fehler beim Schließen der Datenbank:', err.message);
    } else {
        console.log('Datenbankverbindung geschlossen.');
    }
});








//Arbeitszeit + Fehlzeiten erfassen
function arbeitszeitInDB(user_id, type, start_date, start_time, end_time, description) {
    // Verbindung zur DB
    const db = new sqlite3.Database('Datenbank.db', (err) => {
        if (err) {
            console.error('Fehler beim Öffnen der Datenbank:', err.message);
            return;
        }
    });

    // Daten in die Tabelle einfügen
    const insertQuery = `
        INSERT INTO Timeplan (user_id, type, start_date, start_time, end_time)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(insertQuery, [user_id, type, start_date, start_time, end_time, description], function (err) {
        if (err) {
            console.error('Fehler beim Einfügen der Daten:', err.message);
        } else {
            console.log('Daten erfolgreich eingefügt.');
        }

        // Verbindung zur Datenbank schließen
        db.close((err) => {
            if (err) {
                console.error('Fehler beim Schließen der Datenbank:', err.message);
            } else {
                console.log('Datenbankverbindung geschlossen.');
            }
        });
    });
}








//Daten aus DB für die Übersicht abrufen
function datenAnzeigen(user_id) {
    return new Promise((resolve, reject) => {
        // Verbindung zur DB
        const db = new sqlite3.Database('Datenbank.db', (err) => {
            if (err) {
                console.error('Fehler beim Öffnen der Datenbank:', err.message);
                reject(err);
                return;
            }
        });

        // SQL-Abfrage: Alle Zeilen mit der gegebenen user_id abrufen
        const selectQuery = `SELECT * FROM Timeplan WHERE userid = ?`;

        db.all(selectQuery, [user_id], (err, rows) => {
            if (err) {
                console.error('Fehler beim Abrufen der Daten:', err.message);
                db.close();
                reject(err);
            } else {
                console.log('Daten erfolgreich abgerufen:', rows);
                resolve(rows); // Gibt die entsprechenden Zeilen zurück, falls vorhanden
            }

            // Verbindung zur Datenbank schließen
            db.close((err) => {
                if (err) {
                    console.error('Fehler beim Schließen der Datenbank:', err.message);
                } else {
                    console.log('Datenbankverbindung geschlossen.');
                }
            });
        });
    });
}