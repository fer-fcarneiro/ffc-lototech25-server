const API_URL = "http://192.168.0.7:3000"

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

}