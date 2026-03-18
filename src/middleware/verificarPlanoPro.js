const fs = require("fs")

const USERS_FILE = "./users.json"

function lerUsuarios(){

 const data = fs.readFileSync(USERS_FILE)

 return JSON.parse(data)

}

function verificarPlanoPro(req,res,next){

 const id = parseInt(req.params.id)

 const users = lerUsuarios()

 const user = users.find(u => u.id === id)

 if(!user){
  return res.status(404).json({
   erro:"Usuário não encontrado"
  })
 }

 if(user.plano !== "pro"){
  return res.status(403).json({
   erro:"Recurso disponível apenas para usuários PRO"
  })
 }

 next()

}

module.exports = verificarPlanoPro