/*const express = require("express")
const router = express.Router()
const db = require("../database/db")

// ===============================
// GERAR JOGO
// ===============================
function gerarJogo() {

 const numeros = new Set()

 while (numeros.size < 15) {
  numeros.add(Math.floor(Math.random() * 25) + 1)
 }

 return Array.from(numeros).sort((a, b) => a - b)
}

// ===============================
// BUSCAR ULTIMO RESULTADO
// ===============================
function getUltimoResultado() {

 return new Promise((resolve, reject) => {

  db.get(
   `SELECT dezenas FROM resultados
    ORDER BY concurso DESC
    LIMIT 1`,
   [],
   (err, row) => {

    if (err) return reject(err)
    if (!row) return resolve(null)

    resolve(row.dezenas.split(",").map(Number))
   }
  )

 })
}

// ===============================
// FILTROS
// ===============================
async function jogoAprovado(jogo, paresSelecionado) {

 const ultimoConcurso = await getUltimoResultado()
 if (!ultimoConcurso) return false

 let pares = 0
 let soma = 0
 let repetidas = 0

 for (let n of jogo) {

  if (n % 2 === 0) pares++
  if (ultimoConcurso.includes(n)) repetidas++
  soma += n
 }

 const impares = 15 - pares

 // 🔥 Filtro soma
 if (soma < 185 || soma > 228) return false

 // 🔥 Filtro pares dinâmico
 if (paresSelecionado !== null && paresSelecionado !== undefined) {

  if (pares !== Number(paresSelecionado)) return false

 } else {

  // Regra padrão
  const paridadeOk =
   (pares === 7 && impares === 8) ||
   (pares === 8 && impares === 7) ||
   (pares === 6 && impares === 9) ||
   (pares === 9 && impares === 6)

  if (!paridadeOk) return false
 }

 // 🔥 Filtro repetidas
 if (repetidas < 8 || repetidas > 11) return false

 return true
}

// ===============================
// GERAR VARIOS FILTRADOS + SALVAR
// ===============================
router.post("/filtrados", async (req, res) => {

 const { quantidade, pares } = req.body

 if (!quantidade || quantidade <= 0) {
  return res.status(400).json({ erro: "Quantidade inválida" })
 }

 const ultimo = await getUltimoResultado()

 if (!ultimo) {
  return res.status(400).json({
   erro: "Cadastre o último concurso antes de gerar jogos."
  })
 }

 const jogosAprovados = []
 let tentativas = 0
 const limite = 100000

 while (jogosAprovados.length < quantidade && tentativas < limite) {

  tentativas++

  const jogo = gerarJogo()

  if (await jogoAprovado(jogo, pares)) {

   jogosAprovados.push(jogo)

   // salvar no banco
   db.run(
    "INSERT INTO jogos (numeros) VALUES (?)",
    [jogo.join(",")]
   )
  }
 }

 res.json({ jogos: jogosAprovados })
})

// ===============================
// HISTORICO
// ===============================
router.get("/historico", (req, res) => {

 db.all(
  "SELECT numeros FROM jogos ORDER BY id DESC LIMIT 1000",
  [],
  (err, rows) => {

   if (err) {
    return res.status(500).json({ erro: err.message })
   }

   const lista = rows.map((jogo, index) => {
    return `${index + 1}) ${jogo.numeros}`
   })

   res.json(lista)
  }
 )
})

// ===============================
// LIMPAR BANCO
// ===============================
router.delete("/limpar", (req, res) => {

 db.run("DELETE FROM jogos", function(err) {

  if (err) {
   return res.status(500).json({ erro: err.message })
  }

  res.json({
   mensagem: "Banco limpo com sucesso"
  })
 })
})

module.exports = router
*/
const express = require("express")
const router = express.Router()
const db = require("../database/db")

// ===============================
// GERAR JOGO
// ===============================
function gerarJogo(universo){

 const numeros = new Set()

 const base = universo && universo.length > 0
  ? universo
  : Array.from({length:25},(_,i)=>i+1)

 while(numeros.size < 15){

  const random = base[Math.floor(Math.random()*base.length)]
  numeros.add(random)

 }

 return Array.from(numeros).sort((a,b)=>a-b)

}

// ===============================
// BUSCAR ULTIMO RESULTADO
// ===============================
function getUltimoResultado(){

 return new Promise((resolve,reject)=>{

  db.get(
   `SELECT dezenas FROM resultados
    ORDER BY concurso DESC
    LIMIT 1`,
   [],
   (err,row)=>{

    if(err) return reject(err)
    if(!row) return resolve(null)

    resolve(row.dezenas.split(",").map(Number))

   }
  )

 })

}

// ===============================
// FILTRO ESTATISTICO
// ===============================
async function jogoAprovado(jogo,paresLista,repetidasLista){

 const ultimo = await getUltimoResultado()
 if(!ultimo) return false

 let pares = 0
 let soma = 0
 let repetidas = 0

 for(let n of jogo){

  if(n % 2 === 0) pares++
  if(ultimo.includes(n)) repetidas++
  soma += n

 }

 const impares = 15 - pares

// ===============================
// FILTRO SOMA
// ===============================
 if(soma < 185 || soma > 228) return false

// ===============================
// FILTRO PARIDADE
// ===============================
 if(paresLista && paresLista.length > 0){

  if(!paresLista.includes(pares)) return false

 }else{

  const paridadeOk =
   (pares === 7 && impares === 8) ||
   (pares === 8 && impares === 7) ||
   (pares === 6 && impares === 9) ||
   (pares === 9 && impares === 6)

  if(!paridadeOk) return false

 }

// ===============================
// FILTRO REPETIDAS
// ===============================
 if(repetidasLista && repetidasLista.length > 0){

  if(!repetidasLista.includes(repetidas)) return false

 }else{

  if(repetidas < 8 || repetidas > 11) return false

 }

 return true

}

// ===============================
// GERAR JOGOS FILTRADOS
// ===============================
router.post("/filtrados", async (req,res)=>{

 try{

  const {quantidade,dezenas,pares,repetidas} = req.body

  if(!quantidade || quantidade <= 0){

   return res.status(400).json({
    erro:"Quantidade inválida"
   })

  }

  if(quantidade > 500){

   return res.status(400).json({
    erro:"Máximo permitido é 500 jogos"
   })

  }

  const ultimo = await getUltimoResultado()

  if(!ultimo){

   return res.status(400).json({
    erro:"Cadastre o último concurso antes de gerar jogos."
   })

  }

  const jogosAprovados = []
  let tentativas = 0
  const limite = 100000

  while(jogosAprovados.length < quantidade && tentativas < limite){

   tentativas++

   const jogo = gerarJogo(dezenas)

   if(await jogoAprovado(jogo,pares,repetidas)){

    jogosAprovados.push(jogo)

    db.run(
     "INSERT INTO jogos (numeros) VALUES (?)",
     [jogo.join(",")]
    )

   }

  }

  res.json({
   jogos:jogosAprovados
  })

 }catch(erro){

  res.status(500).json({
   erro:erro.message
  })

 }

})

// ===============================
// HISTORICO
// ===============================
router.get("/historico",(req,res)=>{

 db.all(
  "SELECT numeros FROM jogos ORDER BY id DESC LIMIT 1000",
  [],
  (err,rows)=>{

   if(err){
    return res.status(500).json({erro:err.message})
   }

   const lista = rows.map((jogo,index)=>{

    return{
     id:index+1,
     numeros:jogo.numeros
    }

   })

   res.json(lista)

  }
 )

})

// ===============================
// LIMPAR BANCO
// ===============================
router.delete("/limpar",(req,res)=>{

 db.run("DELETE FROM jogos",function(err){

  if(err){
   return res.status(500).json({erro:err.message})
  }

  res.json({
   mensagem:"Banco limpo com sucesso"
  })

 })

})

module.exports = router