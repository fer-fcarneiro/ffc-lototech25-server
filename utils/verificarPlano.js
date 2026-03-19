export async function verificarPlano() {

 try {

  const response = await fetch( `https://ffc-lototech25-server.onrender.com/users/${userId}/plano`)

  if (!response.ok) {
   return "free"
  }

  const data = await response.json()

  return data.plano || "free"

 } catch (error) {

  console.log("Erro ao verificar plano:", error)

  return "free"

 }

}