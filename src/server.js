
console.log("🚀 Iniciando servidor...")

const app = require("./app")
const connectMongo = require("./database/mongo") // 👈 NOVO

connectMongo() // 👈 NOVO

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`)
})