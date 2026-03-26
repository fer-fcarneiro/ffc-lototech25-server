const mongoose = require("mongoose");

const ResultadoSchema = new mongoose.Schema({
  concurso: {
    type: Number,
    unique: true,
    required: true,
  },
  dezenas: {
    type: String,
    required: true,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resultado", ResultadoSchema);
