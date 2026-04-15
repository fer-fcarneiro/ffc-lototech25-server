console.log("🚀 Iniciando servidor...");

const app = require("./app");
const connectMongo = require("./database/mongo");

const startServer = async () => {
  try {
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
