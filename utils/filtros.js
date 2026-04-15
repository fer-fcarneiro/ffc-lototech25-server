export function somaJogo(jogo) {
 return jogo.reduce((t, n) => t + n, 0)
}

export function somaValida(jogo) {

 const soma = somaJogo(jogo)

 return soma >= 185 && soma <= 228
}

export function pares(jogo) {
 return jogo.filter(n => n % 2 === 0).length
}

export function repetidas(jogo, ultimo) {
 return jogo.filter(n => ultimo.includes(n)).length
}