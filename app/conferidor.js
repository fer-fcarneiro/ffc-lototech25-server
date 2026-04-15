import AsyncStorage from "@react-native-async-storage/async-storage"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { Alert, Text, View } from "react-native"

import AppButton from "../components/AppButton"
import Button from "../components/Button"
import styles from "../styles/globalStyles"

export default function Conferidor(){

 const router = useRouter()
 const params = useLocalSearchParams()

 const id = params.id
const jogos = JSON.parse(params.jogos || "[]")

 const [resultado,setResultado] = useState([])

 const numeros = Array.from({length:25},(_,i)=>i+1)

 function selecionarNumero(num){

  setResultado(prev => {

   if(prev.includes(num)){
    return prev.filter(n => n !== num)
   }

   if(prev.length >= 15){
    return prev
   }

   return [...prev,num]

  })

 }

async function salvarResultado(){

 if(resultado.length !== 15){
  Alert.alert("Resultado","Selecione exatamente 15 dezenas")
  return
 }

 try{

  

  console.log("ID recebido:", id)
  console.log("Jogos recebidos:", jogos)

  const dados = await AsyncStorage.getItem("historicoJogos")

  let historico = dados ? JSON.parse(dados) : []

  console.log("Histórico carregado:", historico)

  const index = historico.findIndex(g => String(g.id) === String(id))

  if(index === -1){
   Alert.alert("Erro","Grupo não encontrado no histórico.")
   return
  }

  historico[index].resultado = resultado.sort((a,b)=>a-b)

  historico[index].jogos = jogos.map(jogo => {

   const dezenas = Array.isArray(jogo) ? jogo : jogo.dezenas

   const acertos = dezenas.filter(n =>
    resultado.includes(n)
   ).length

   return {
    dezenas,
    acertos
   }

  })

  await AsyncStorage.setItem(
   "historicoJogos",
   JSON.stringify(historico)
  )

  console.log("Grupo atualizado:", historico[index])
  console.log("Salvo e voltando...")
  router.replace("/historicoJogos")

 }catch(e){

  console.log("Erro ao salvar resultado", e)

 }

}

 return(

  <View style={styles.container}>

   <Text style={styles.titulo}>
    Resultado do Concurso ({resultado.length}/15)
   </Text>

   {params.grupo && (
    <Text style={{marginBottom:10}}>
     Grupo: {params.grupo}
    </Text>
   )}

   <View style={styles.grid}>

    {numeros.map(num => (

     <Button
      key={num}
      numero={num}
      selecionado={resultado.includes(num)}
      onPress={() => selecionarNumero(num)}
     />

    ))}

   </View>

   <AppButton
    title="Salvar Resultado e Conferir"
    onPress={salvarResultado}
    disabled={resultado.length !== 15}
   />

  </View>

 )

}

