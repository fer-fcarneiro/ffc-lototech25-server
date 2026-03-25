const mongoose = require("mongoose")

const connectMongo = async () => {
  try {
    console.log("🚀 Tentando conectar Mongo...")

    await mongoose.connect(process.env.MONGO_URI)

    console.log("🔥 MongoDB conectado")

  } catch (error) {
    console.log("❌ Erro MongoDB:", error)
    // NÃO trava o servidor
  }
}

module.exports = connectMongo