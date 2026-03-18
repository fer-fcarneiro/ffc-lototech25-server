const express = require("express")
const fs = require("fs")

const router = express.Router()

const verificarPlanoPro = require("../middleware/verificarPlanoPro")

const USERS_FILE = "./users.json"


// ==========================
// LER USUÁRIOS
// ==========================

function lerUsuarios(){

 if(!fs.existsSync(USERS_FILE)){
  fs.writeFileSync(USERS_FILE, "[]")
 }

 const data = fs.readFileSync(USERS_FILE)

 return JSON.parse(data)

}


// ==========================
// SALVAR USUÁRIOS
// ==========================

function salvarUsuarios(users){

 fs.writeFileSync(
  USERS_FILE,
  JSON.stringify(users, null, 2)
 )

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

 const { email, senha } = req.body

 const users = lerUsuarios()

 const existe = users.find(u => u.email === email)

 if(existe){
  return res.status(400).json({
   erro:"Email já cadastrado"
  })
 }

 const novoUser = {
  id: Date.now(),
  email,
  senha,
  plano:"free"
 }

 users.push(novoUser)

 salvarUsuarios(users)

 res.json(novoUser)

})


// ==========================
// LOGIN
// ==========================

router.post("/login",(req,res)=>{

 const { email, senha } = req.body

 const users = lerUsuarios()

 const user = users.find(
  u => u.email === email && u.senha === senha
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


module.exports = router