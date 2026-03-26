/*console.log("🚀 Iniciando servidor...")

const app = require("./app")
const connectMongo = require("./database/mongo") // 👈 NOVO

connectMongo() // 👈 NOVO

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`)
})*/
console.log("🚀 Iniciando servidor...");

const app = require("./app");
const connectMongo = require("./database/mongo");

const startServer = async () => {
  try {
    // Conecta ao Mongo primeiro
    await connectMongo();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
  }
};

startServer();
