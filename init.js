// init.js

// Felcsatlakozás a MongoDB szerverre
var conn = new Mongo();

// Kiválasztása az adatbázisnak
var db = conn.getDB("my_db");

// Új adatok beszúrása
db.Init.insert({"Init": true});
