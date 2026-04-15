import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, Text, View } from "react-native"

import AppButton from "../components/AppButton"
import Button from "../components/Button"
import styles from "../styles/globalStyles"

export default function EscolherDezenas(){

 const router = useRouter()

 const [selecionadas,setSelecionadas] = useState([])
 const [plano,setPlano] = useState("free")

 const numeros = Array.from({length:25},(_,i)=>i+1)

 useEffect(()=>{

  async function carregarPlano(){

   const planoSalvo = await AsyncStorage.getItem("planoUsuario")

   if(planoSalvo){
    setPlano(planoSalvo.toLowerCase())
   }else{
    setPlano("free")
   }

   console.log("Plano carregado:", planoSalvo)

  }

  carregarPlano()

 },[])

 function selecionarNumero(num){

  setSelecionadas(prev => {

   if(prev.includes(num)){
    return prev.filter(n => n !== num)
   }

   const limite = plano === "pro" ? 25 : 17

   if(prev.length >= limite){

    Alert.alert(
     "Limite atingido",
     plano === "pro"
      ? "Limite máximo de 25 dezenas."
      : "Plano FREE permite escolher até 17 dezenas."
    )

    return prev
   }

   return [...prev,num]

  })

 }

 function continuar(){

  if(selecionadas.length < 15){

   Alert.alert(
    "Atenção",
    "Escolha pelo menos 15 dezenas para continuar."
   )

   return
  }

  router.push({
   pathname:"/gerarJogos",
   params:{
    dezenas:JSON.stringify(selecionadas)
   }
  })

 }

 return(

  <View style={styles.container}>

   <Text style={styles.titulo}>
    Escolher Dezenas Para Apostar  ({selecionadas.length})
   </Text>

   <View style={styles.grid}>

    {numeros.map(num => (

     <Button
      key={num}
      numero={num}
      selecionado={selecionadas.includes(num)}
      onPress={()=>selecionarNumero(num)}
     />

    ))}

   </View>

   <AppButton
    title="Salvar e Continuar"
    onPress={continuar}
   />

  </View>

 )

}