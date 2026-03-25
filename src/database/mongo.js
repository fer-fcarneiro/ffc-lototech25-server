const mongoose = require("mongoose")

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("🔥 MongoDB conectado")
  } catch (error) {
    console.log("❌ Erro MongoDB:", error)
  }
}

module.exports = connectMongo