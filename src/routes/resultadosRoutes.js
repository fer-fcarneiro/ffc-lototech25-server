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
