/*const service = require("../services/users.service")

// LISTAR usuários
exports.list = (req, res) => {

 const users = service.getUsers()

 res.status(200).json(users)

}

// CRIAR usuário
exports.create = (req, res) => {

 const { nome } = req.body

 if (!nome) {
  return res.status(400).json({
   erro: "Nome é obrigatório"
  })
 }

 const user = service.createUser({ nome })

 res.status(201).json(user)

}

// ATUALIZAR usuário
exports.update = (req, res) => {

 const id = parseInt(req.params.id)

 const { nome } = req.body

 if (!nome) {
  return res.status(400).json({
   erro: "Nome é obrigatório"
  })
 }

 const user = service.updateUser(id, { nome })

 if (!user) {
  return res.status(404).json({
   erro: "Usuário não encontrado"
  })
 }

 res.status(200).json(user)

}

// REMOVER usuário
exports.remove = (req, res) => {

 const id = parseInt(req.params.id)

 const removed = service.deleteUser(id)

 if (!removed) {
  return res.status(404).json({
   erro: "Usuário não encontrado"
  })
 }

 res.status(200).json({
  mensagem: "Usuário removido"
 })

}*/

const service = require("../services/users.service")

// LISTAR usuários
exports.list = (req, res) => {

 const users = service.getUsers()

 res.status(200).json(users)

}

// CRIAR usuário (CADASTRO)
exports.create = (req, res) => {

 const { email, senha } = req.body

 if (!email || !senha) {

  return res.status(400).json({
   erro: "Email e senha são obrigatórios"
  })

 }

 const user = service.createUser({
  email,
  senha,
  plano: "free"
 })

 res.status(201).json({
  sucesso: true,
  usuario: user
 })

}