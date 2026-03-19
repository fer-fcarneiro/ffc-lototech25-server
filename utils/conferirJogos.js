export function conferirJogos(jogos, resultado){

 const resultadoSet = new Set(resultado)

 return jogos.map((jogo,index)=>{

  let acertos = 0

  jogo.forEach(numero=>{
   if(resultadoSet.has(numero)){
    acertos++
   }
  })

  return{
   id:index+1,
   numeros:jogo,
   acertos
  }

 })

}