const express = require("express")
const router = express.Router()
const db = require("../database/db")

// SALVAR RESULTADO
router.post("/", (req, res) => {

 const { concurso, dezenas } = req.body

 if (!concurso || !dezenas || dezenas.length !== 15) {
  return res.status(400).json({
   erro: "Informe concurso e 15 dezenas"
  })
 }

 const dezenasString = dezenas.join(",")

 db.run(
  `INSERT OR REPLACE INTO resultados (concurso, dezenas)
   VALUES (?, ?)`,
  [concurso, dezenasString],
  function(err) {

   if (err) {
    return res.status(500).json({ erro: err.message })
   }

   res.json({ mensagem: "Resultado salvo com sucesso" })
  }
 )

})

// BUSCAR ULTIMO
router.get("/ultimo", (req, res) => {

 db.get(
  `SELECT concurso, dezenas
   FROM resultados
   ORDER BY concurso DESC
   LIMIT 1`,
  [],
  (err, row) => {

   if (err) {
    return res.status(500).json({ erro: err.message })
   }

   if (!row) {
    return res.status(404).json({ erro: "Nenhum resultado cadastrado" })
   }

   res.json({
    concurso: row.concurso,
    dezenas: row.dezenas.split(",").map(Number)
   })
  }
 )

})

module.exports = router