/*export async function verificarPlano(email) {

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

}*/
import { BASE_URL } from "../utils/config"

export async function verificarPlano(email) {
  try {
    const url = `${BASE_URL}/verificarPlano?email=${email}`

    console.log("🔗 URL:", url)

    const response = await fetch(url)

    if (!response.ok) {
      console.log("❌ Resposta não OK")
      return "free"
    }

    const data = await response.json()

    console.log("📦 Plano recebido:", data)

    return data.plano || "free"
  } catch (error) {
    console.log("🚨 Erro verificar plano:", error)
    return "free"
  }
}