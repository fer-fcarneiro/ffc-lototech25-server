export function gerarJogosFiltrados(quantidade, dezenas, pares, repetidas){

 // se o usuário escolheu exatamente 15 dezenas
 // só existe um jogo possível

 if(dezenas.length === 15){

  const jogoUnico = [...dezenas].sort((a,b)=>a-b)

  if(!passaFiltroSoma(jogoUnico)) return []
  if(!passaFiltroPares(jogoUnico, pares)) return []
  if(!passaFiltroRepetidas(jogoUnico, repetidas)) return []

  return [jogoUnico]

 }

 const jogos = []
 const jogosSet = new Set()

 let tentativas = 0
 const maxTentativas = quantidade * 100

 while(jogos.length < quantidade && tentativas < maxTentativas){

  tentativas++

  const jogo = gerarJogoRapido(dezenas)

  if(!passaFiltroSoma(jogo)) continue
  if(!passaFiltroPares(jogo, pares)) continue
  if(!passaFiltroRepetidas(jogo, repetidas)) continue

  const chave = jogo.join("-")

  if(jogosSet.has(chave)) continue

  jogosSet.add(chave)
  jogos.push(jogo)

 }

 return jogos

}



function gerarJogoRapido(dezenas){

 const copia = [...dezenas]
 const jogo = []

 while(jogo.length < 15){

  const i = Math.floor(Math.random() * copia.length)

  jogo.push(copia[i])

  copia.splice(i,1)

 }

 return jogo.sort((a,b)=>a-b)

}



function passaFiltroSoma(jogo){

 const soma = jogo.reduce((t,n)=> t + n,0)

 return soma >= 188 && soma <= 228

}



function passaFiltroPares(jogo, pares){

 if(!pares || pares.length === 0){
  return true
 }

 const qtd = jogo.filter(n => n % 2 === 0).length

 return pares.includes(qtd)

}



function passaFiltroRepetidas(jogo, repetidas){

 if(!repetidas || repetidas.length === 0){
  return true
 }

 // simulação simples por enquanto
 // depois pode usar resultado anterior real

 const qtd = Math.floor(Math.random()*12)

 return repetidas.includes(qtd)

}