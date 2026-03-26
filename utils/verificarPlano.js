/*export async function verificarPlano() {

 try {

  const response = await fetch( `https://ffc-lototech25-server-1.onrender.com/users/${userId}/plano`)

  if (!response.ok) {
   return "free"
  }

  const data = await response.json()

  return data.plano || "free"

 } catch (error) {

  console.log("Erro ao verificar plano:", error)

  return "free"

 }

}*/
import { BASE_URL } from "../utils/config"

export async function verificarPlano(email) {
  try {
    const url = `${BASE_URL}/verificarPlano?email=${email}`

    console.log("URL verificarPlano:", url)

    const response = await fetch(url)

    if (!response.ok) {
      console.log("Resposta não OK")
      return "free"
    }

    const data = await response.json()

    console.log("Plano recebido:", data)

    return data.plano || "free"
  } catch (error) {
    console.log("Erro verificar plano:", error)
    return "free"
  }
}