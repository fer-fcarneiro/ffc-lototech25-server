/*const express = require("express")

const usersRoutes = require("./routes/usersRoutes")
const jogosRoutes = require("./routes/jogosRoutes")
const resultadosRoutes = require("./routes/resultadosRoutes")
const filtrosRoutes = require("./routes/filtrosRoutes")


const app = express()

app.use(express.json())

app.use("/users", usersRoutes)
app.use("/jogos", jogosRoutes)
app.use("/resultados", resultadosRoutes)
app.use("/filtros", filtrosRoutes)


app.get("/", (req, res) => {
 res.send("API funcionando 🚀")
})

module.exports = app */

const express = require("express")
const cors = require("cors")

const usersRoutes = require("./routes/usersRoutes")
const jogosRoutes = require("./routes/jogosRoutes")
const resultadosRoutes = require("./routes/resultadosRoutes")
const filtrosRoutes = require("./routes/filtrosRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/jogos", jogosRoutes)
app.use("/resultados", resultadosRoutes)
app.use("/filtros", filtrosRoutes)

app.get("/", (req, res) => {
 res.send("API FFC LotoTech25 funcionando 🚀")
})

module.exports = app