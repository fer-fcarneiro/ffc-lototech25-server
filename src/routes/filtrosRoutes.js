const express = require("express")
const router = express.Router()

const modulosParidade = {
 1: "6-9",
 2: "7-8",
 3: "8-7",
 4: "9-6"
}

router.post("/", (req, res) => {

 const { numeros } = req.body

 if (!numeros || numeros.length !== 15) {
  return res.status(400).json({
   erro: "Envie exatamente 15 números"
  })
 }

 // 🔥 Garantir números válidos
 const numerosValidos = numeros.map(Number)

 const numerosUnicos = new Set(numerosValidos)

 if (numerosUnicos.size !== 15) {
  return res.status(400).json({
   erro: "Os números não podem se repetir"
  })
 }

 if (numerosValidos.some(n => n < 1 || n > 25)) {
  return res.status(400).json({
   erro: "Números devem estar entre 1 e 25"
  })
 }

 // ordenar
 numerosValidos.sort((a,b)=>a-b)

 // pares e impares
 const pares = numerosValidos.filter(n => n % 2 === 0).length
 const impares = 15 - pares

 // soma
 const soma = numerosValidos.reduce((total, n) => total + n, 0)



 const { moduloParImpar} = req.body


if (!moduloParImpar || !modulosParidade[moduloParImpar]) {
 return res.status(400).json({
  erro: "Módulo de paridade inválido"
 })
}

const distribuicao = `${pares}-${impares}`

const moduloEscolhido = modulosParidade[moduloParImpar]

const paresOk = distribuicao === moduloEscolhido

 const somaOk = soma >= 185 && soma <= 228

 const aprovado = paresOk && somaOk

 res.json({
  numeros: numerosValidos,
  pares,
  impares,
  soma,
  distribuicao,
  paresOk,
  somaOk,
  aprovado
 })

})

module.exports = router