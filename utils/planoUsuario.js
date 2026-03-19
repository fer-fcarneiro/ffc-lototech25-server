export async function verificarPlano(email) {

 try {

  const response = await fetch(
   `http://192.168.0.7:3000/verificarPlano?email=${email}`
  )

  if(!response.ok){
   return "free"
  }

  const data = await response.json()

  return data.plano || "free"

 } catch (error) {

  console.log("Erro verificar plano:", error)

  return "free"

 }

}