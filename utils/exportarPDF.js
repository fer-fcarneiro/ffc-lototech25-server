

 import * as Print from "expo-print"
import * as Sharing from "expo-sharing"

export async function exportarPDF(jogos, resultado=null, data="", hora=""){

 try{

  if(!jogos || jogos.length === 0){
   throw new Error("Nenhum jogo para exportar")
  }

  let resultadoHTML = ""

  if(resultado && resultado.length === 15){

   resultadoHTML = `
    <p><b>Resultado do concurso</b></p>
    <p style="font-size:18px;font-weight:bold;">
     ${resultado.join(" - ")}
    </p>
    <hr/>
   `
  }

  let jogosHTML = ""

  jogos.forEach((item,index)=>{

   let numeros = null
   let acertos = null

   // jogo simples
   if(Array.isArray(item)){
    numeros = item
   }

   // jogo conferido
   else if(item && Array.isArray(item.dezenas)){
    numeros = item.dezenas
    acertos = item.acertos
   }

   if(!numeros){
    console.log("Formato inválido:", item)
    return
   }

   // calcular acertos se necessário
   if(acertos === null && resultado && resultado.length === 15){
    acertos = numeros.filter(n => resultado.includes(n)).length
   }

   jogosHTML += `
    <div style="margin-bottom:10px;">
     <p><b>Jogo ${index + 1}</b></p>
     <p>${numeros.join(" - ")}</p>
     ${acertos !== null ? `<p>Acertos: ${acertos}</p>` : ""}
     <hr/>
    </div>
   `

  })

  const html = `
  <html>
  <head>
  <meta charset="utf-8"/>
  <style>

  body{
   font-family: Arial;
   padding:20px;
  }

  h2{
   text-align:center;
  }

  </style>
  </head>

  <body>

  <h2>FFC LotoTech25</h2>

  <p><b>Data:</b> ${data}</p>
  <p><b>Hora:</b> ${hora}</p>

  ${resultadoHTML}

  <p><b>Quantidade de jogos:</b> ${jogos.length}</p>

  <hr/>

  ${jogosHTML}

  </body>
  </html>
  `

  const { uri } = await Print.printToFileAsync({
   html
  })

  await Sharing.shareAsync(uri)

 }catch(e){

  console.log("Erro exportar", e)

 }

}