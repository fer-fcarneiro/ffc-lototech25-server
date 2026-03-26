const mongoose = require("mongoose");

const JogoSchema = new mongoose.Schema({
  numeros: {
    type: String,
    required: true,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Jogo", JogoSchema);
