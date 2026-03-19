import AsyncStorage from "@react-native-async-storage/async-storage"

export async function verificarPlanoServidor(){

 try{

  const usuarioId = await AsyncStorage.getItem("usuarioId")

  if(!usuarioId){
   return "free"
  }

  const response = await fetch(
   `http://192.168.0.7:3000/users/${usuarioId}/plano`
  )

  if(!response.ok){
   return "free"
  }

  const data = await response.json()

  const plano = data.plano || "free"

  await AsyncStorage.setItem("planoUsuario", plano)

  return plano

 }catch(error){

  console.log("Erro ao verificar plano:", error)

  return "free"

 }

}