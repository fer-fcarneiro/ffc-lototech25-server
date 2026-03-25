
/*
const express = require("express")
const fs = require("fs")
const path = require("path")

const router = express.Router()

// caminho absoluto
const USERS_FILE = path.join(__dirname, "../users.json")

// ==========================
// LER USUÁRIOS
// ==========================

function lerUsuarios(){
 try {

  if(!fs.existsSync(USERS_FILE)){
   fs.writeFileSync(USERS_FILE, "[]")
  }

  const data = fs.readFileSync(USERS_FILE, "utf-8")

  if(!data){
   return []
  }

  return JSON.parse(data)

 } catch (error) {
  console.log("Erro ao ler usuários:", error)
  return []
 }
}

// ==========================
// SALVAR USUÁRIOS
// ==========================

function salvarUsuarios(users){
 try {
  fs.writeFileSync(
   USERS_FILE,
   JSON.stringify(users, null, 2)
  )
 } catch (error) {
  console.log("Erro ao salvar usuários:", error)
 }
}

// ==========================
// LISTAR USUÁRIOS
// ==========================

router.get("/", (req,res)=>{
 const users = lerUsuarios()
 res.json(users)
})

// ==========================
// CADASTRO
// ==========================

router.post("/", (req,res)=>{

 const { email, senha, plano } = req.body

 if(!email || !senha){
  return res.status(400).json({
   erro:"Email e senha são obrigatórios"
  })
 }

 const users = lerUsuarios()

 const existe = users.find(
  u => u.email.toLowerCase() === email.toLowerCase()
 )

 if(existe){
  return res.status(400).json({
   erro:"Email já cadastrado"
  })
 }

 const novoUser = {
  id: Date.now(),
  email,
  senha,
  plano: plano || "free"
 }

 users.push(novoUser)

 salvarUsuarios(users)

 console.log("USUÁRIO SALVO:", novoUser)

 res.json(novoUser)

})

// ==========================
// LOGIN
// ==========================

router.post("/login",(req,res)=>{

 const { email, senha } = req.body

 const users = lerUsuarios()

 const user = users.find(
  u => u.email.toLowerCase() === email.toLowerCase() &&
       u.senha === senha
 )

 if(!user){
  return res.status(401).json({
   erro:"Email ou senha inválidos"
  })
 }

 res.json({
  id:user.id,
  email:user.email,
  plano:user.plano
 })

})

// ==========================
// BUSCAR USUÁRIO
// ==========================

router.get("/:id",(req,res)=>{

 const id = parseInt(req.params.id)

 const users = lerUsuarios()

 const user = users.find(u => u.id === id)

 if(!user){
  return res.status(404).json({
   erro:"Usuário não encontrado"
  })
 }

 res.json(user)

})

// ==========================
// VERIFICAR PLANO
// ==========================

router.get("/:id/plano",(req,res)=>{

 const id = parseInt(req.params.id)

 const users = lerUsuarios()

 const user = users.find(u => u.id === id)

 if(!user){
  return res.status(404).json({
   erro:"Usuário não encontrado"
  })
 }

 res.json({
  id:user.id,
  plano:user.plano
 })

})

// ==========================
// ATUALIZAR USUÁRIO
// ==========================

router.put("/:id",(req,res)=>{

 const id = parseInt(req.params.id)

 const users = lerUsuarios()

 const user = users.find(u => u.id === id)

 if(!user){
  return res.status(404).json({
   erro:"Usuário não encontrado"
  })
 }

 user.email = req.body.email ?? user.email
 user.senha = req.body.senha ?? user.senha

 // ⚠️ permite mudar plano (ok por enquanto)
 user.plano = req.body.plano ?? user.plano

 salvarUsuarios(users)

 res.json(user)

})

// ==========================
// REMOVER USUÁRIO
// ==========================

router.delete("/:id",(req,res)=>{

 const id = parseInt(req.params.id)

 let users = lerUsuarios()

 users = users.filter(u => u.id !== id)

 salvarUsuarios(users)

 res.json({
  mensagem:"Usuário removido"
 })

})

module.exports = router */

const express = require("express")
const router = express.Router()
const User = require("../models/User")

// ==========================
// LISTAR USUÁRIOS
// ==========================

router.get("/", async (req, res) => {
 try {
  const users = await User.find()
  res.json(users)
 } catch (error) {
  res.status(500).json({ erro: "Erro ao listar usuários" })
 }
})

// ==========================
// CADASTRO
// ==========================

router.post("/", async (req, res) => {
 try {
  const { email, senha, plano } = req.body

  if (!email || !senha) {
   return res.status(400).json({
    erro: "Email e senha são obrigatórios"
   })
  }

  const existe = await User.findOne({
   email: email.toLowerCase()
  })

  if (existe) {
   return res.status(400).json({
    erro: "Email já cadastrado"
   })
  }

  const novoUser = new User({
   email: email.toLowerCase(),
   senha,
   plano: plano || "free"
  })

  await novoUser.save()

  console.log("USUÁRIO SALVO:", novoUser)

  res.json(novoUser)

 } catch (error) {
  res.status(500).json({ erro: "Erro no cadastro" })
 }
})

// ==========================
// LOGIN
// ==========================

router.post("/login", async (req, res) => {
 try {
  const { email, senha } = req.body

  const user = await User.findOne({
   email: email.toLowerCase(),
   senha
  })

  if (!user) {
   return res.status(401).json({
    erro: "Email ou senha inválidos"
   })
  }

  res.json({
   id: user._id,
   email: user.email,
   plano: user.plano
  })

 } catch (error) {
  res.status(500).json({ erro: "Erro no login" })
 }
})

// ==========================
// BUSCAR USUÁRIO
// ==========================

router.get("/:id", async (req, res) => {
 try {
  const user = await User.findById(req.params.id)

  if (!user) {
   return res.status(404).json({
    erro: "Usuário não encontrado"
   })
  }

  res.json(user)

 } catch (error) {
  res.status(500).json({ erro: "Erro ao buscar usuário" })
 }
})

// ==========================
// VERIFICAR PLANO
// ==========================

router.get("/:id/plano", async (req, res) => {
 try {
  const user = await User.findById(req.params.id)

  if (!user) {
   return res.status(404).json({
    erro: "Usuário não encontrado"
   })
  }

  res.json({
   id: user._id,
   plano: user.plano
  })

 } catch (error) {
  res.status(500).json({ erro: "Erro ao verificar plano" })
 }
})

// ==========================
// ATUALIZAR USUÁRIO
// ==========================

router.put("/:id", async (req, res) => {
 try {
  const user = await User.findById(req.params.id)

  if (!user) {
   return res.status(404).json({
    erro: "Usuário não encontrado"
   })
  }

  user.email = req.body.email ?? user.email
  user.senha = req.body.senha ?? user.senha
  user.plano = req.body.plano ?? user.plano

  await user.save()

  res.json(user)

 } catch (error) {
  res.status(500).json({ erro: "Erro ao atualizar usuário" })
 }
})

// ==========================
// REMOVER USUÁRIO
// ==========================

router.delete("/:id", async (req, res) => {
 try {
  await User.findByIdAndDelete(req.params.id)

  res.json({
   mensagem: "Usuário removido"
  })

 } catch (error) {
  res.status(500).json({ erro: "Erro ao remover usuário" })
 }
})

module.exports = router