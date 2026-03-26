/*const API_URL = "http://192.168.0.7:3000"

export async function gerarJogos(qtd, pares) {

 try {

  const response = await fetch(`${API_URL}/jogos/filtrados`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify({
    quantidade: qtd,
   pares: pares
   })
  })

  return await response.json()

 } catch (error) {

  console.log("Erro API:", error)
  return { jogos: [] }

 }

}*/ 
import { BASE_URL } from "../utils/config"

export async function gerarJogos(qtd, pares) {
  try {
    const url = `${BASE_URL}/jogos/filtrados`

    console.log("🎯 Gerar jogos em:", url)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantidade: qtd,
        pares: pares
      })
    })

    if (!response.ok) {
      console.log("❌ Erro na resposta da API")
      return { jogos: [] }
    }

    const data = await response.json()

    console.log("📦 Jogos recebidos:", data)

    return data

  } catch (error) {
    console.log("🚨 Erro API:", error)
    return { jogos: [] }
  }
}