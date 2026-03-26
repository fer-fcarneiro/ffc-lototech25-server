/*const express = require("express")
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

module.exports = router*/

const express = require("express");
const router = express.Router();
const Resultado = require("../models/Resultado");

// ==========================
// SALVAR RESULTADO
// ==========================

router.post("/", async (req, res) => {
  try {
    const { concurso, dezenas } = req.body;

    if (!concurso || !dezenas || dezenas.length !== 15) {
      return res.status(400).json({
        erro: "Informe concurso e 15 dezenas",
      });
    }

    const dezenasString = dezenas.join(",");

    // SUBSTITUIR SE JÁ EXISTIR (igual ao INSERT OR REPLACE)
    const resultado = await Resultado.findOneAndUpdate(
      { concurso },
      { concurso, dezenas: dezenasString },
      { new: true, upsert: true },
    );

    res.json({ mensagem: "Resultado salvo com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ==========================
// BUSCAR ÚLTIMO
// ==========================

router.get("/ultimo", async (req, res) => {
  try {
    const resultado = await Resultado.findOne().sort({ concurso: -1 });

    if (!resultado) {
      return res.status(404).json({
        erro: "Nenhum resultado cadastrado",
      });
    }

    res.json({
      concurso: resultado.concurso,
      dezenas: resultado.dezenas.split(",").map(Number),
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
