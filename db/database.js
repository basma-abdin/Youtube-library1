const sqlite3 = require('sqlite3').verbose()

// SQLITE TABLES
const sql_create_library_table = `CREATE TABLE IF NOT EXISTS library (
  name text,
  title text,
  id text
  );`;

// Create database
let db = new sqlite3.Database('./db/library.db', (err) => {
  if (err) {
    console.error(err.message)
    throw err
  }else{
    console.log('Connected to the SQLite database.')
    db.run("DROP TABLE IF EXISTS library")
      db.run(sql_create_library_table,
      (err) => {
          if (err) {
            console.log("error");
            return console.error(err.message);
          }
          initialize_library_table(require("../john.lib.json"))
          initialize_library_table(require("../mark.lib.json"))
      });
  }
});

function initialize_library_table(lib){
 let name = lib['name']
 let videos = lib['videos']
  const sql_insert = `INSERT INTO library (name, title, id) VALUES (?,?,?)`
  videos.forEach(u => {
    db.run(sql_insert, [name,u.title,u.id])
  });
}



module.exports =  db
