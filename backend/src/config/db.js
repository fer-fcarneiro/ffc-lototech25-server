const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo conectado");
  } catch (err) {
    console.error("Erro Mongo:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
