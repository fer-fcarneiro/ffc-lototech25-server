const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const dbPath = path.join(__dirname, "loto.db")
const db = new sqlite3.Database(dbPath)

db.serialize(() => {

 // TABELA JOGOS
 db.run(`
  CREATE TABLE IF NOT EXISTS jogos (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   numeros TEXT
  )
 `)

 // TABELA RESULTADOS
 db.run(`
  CREATE TABLE IF NOT EXISTS resultados (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   concurso INTEGER UNIQUE,
   dezenas TEXT,
   criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
 `)

})

module.exports = db