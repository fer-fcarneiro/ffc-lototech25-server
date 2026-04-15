import AsyncStorage from "@react-native-async-storage/async-storage"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { gerarJogosFiltrados } from "../utils/geradorJogos"
import { verificarPlano } from "../utils/verificarPlano"

export default function GerarJogos(){

 const router = useRouter()
 const params = useLocalSearchParams()

 let dezenas = []

 try{
  dezenas = params.dezenas ? JSON.parse(params.dezenas) : []
 }catch{
  dezenas = []
 }

 const [quantidade,setQuantidade] = useState(10)
 const [pares,setPares] = useState([])
 const [repetidas,setRepetidas] = useState([])
 const [plano,setPlano] = useState("free")

 const quantidades = [10,20,30,40,50,100,200,500]

 useEffect(()=>{

 async function carregarPlano(){

  try{

   const planoLocal = await AsyncStorage.getItem("planoUsuario")

   if(planoLocal){

    setPlano(planoLocal)

   }else{

    const planoServidor = await verificarPlano()

    setPlano(planoServidor)

    await AsyncStorage.setItem(
     "planoUsuario",
     planoServidor
    )

   }

  }catch(e){

   console.log("Erro ao verificar plano", e)

  }

 }

 carregarPlano()

},[])

 function togglePares(valor){

  if(plano !== "pro"){

   Alert.alert(
    "Função PRO",
    "Filtro de pares disponível apenas no plano PRO."
   )

   return
  }

  setPares(prev => {

   if(prev.includes(valor)){
    return prev.filter(p => p !== valor)
   }

   return [...prev,valor]

  })

 }

 function toggleRepetidas(valor){

  setRepetidas(prev => {

   if(prev.includes(valor)){
    return prev.filter(r => r !== valor)
   }

   return [...prev,valor]

  })

 }

  /* async function gerar(){

  if(plano !== "pro" && quantidade > 20){

   Alert.alert(
    "Plano PRO",
    "Gerar mais de 20 apostas é exclusivo do plano PRO."
   )

   return
  }

  try{

   await AsyncStorage.removeItem("resultado")

  }catch(e){

   console.log("Erro ao limpar resultado", e)

  }

  console.log("DEZENAS:", dezenas)
  console.log("PARES:", pares)
  console.log("REPETIDAS:", repetidas)

  try{

   const jogosGerados = gerarJogosFiltrados(
    quantidade,
    dezenas,
    pares,
    repetidas
   )

   console.log("JOGOS GERADOS:", jogosGerados)

   await salvarHistorico(jogosGerados)

   Alert.alert(
    "FFC LotoTech",
    `Novo grupo gerado\nJogos: ${jogosGerados.length}`,
    [
     {
      text:"OK",
      onPress:()=>router.push("/historicoJogos")
     }
    ]
   )

  }catch(erro){

   console.log("ERRO AO GERAR:",erro)

  }

 } */
async function gerar(){

  // 🔥 limpa estado da rodada anterior
  setPares([])
  setRepetidas([])

  if(plano !== "pro" && quantidade > 20){
    Alert.alert(
      "Plano PRO",
      "Gerar mais de 20 apostas é exclusivo do plano PRO."
    )
    return
  }

  try{
    await AsyncStorage.removeItem("resultado")
  }catch(e){
    console.log("Erro ao limpar resultado", e)
  }

  console.log("DEZENAS:", dezenas)
  console.log("PARES:", pares)
  console.log("REPETIDAS:", repetidas)

  try{

    // 🔥 garante arrays limpos
    const paresLimpos = []
    const repetidasLimpos = []

    const jogosGerados = gerarJogosFiltrados(
      quantidade,
      dezenas,
      paresLimpos,
      repetidasLimpos
    )

    console.log("JOGOS GERADOS:", jogosGerados)

    await salvarHistorico(jogosGerados)

    Alert.alert(
      "FFC LotoTech",
      `Novo grupo gerado\nJogos: ${jogosGerados.length}`,
      [
        {
          text:"OK",
          onPress:()=>router.push("/historicoJogos")
        }
      ]
    )

  }catch(erro){

    console.log("ERRO AO GERAR:",erro)

  }

}

 async function salvarHistorico(jogosGerados){

  try{

   const dados = await AsyncStorage.getItem("historicoJogos")

   let historico = []

   if(dados){
    historico = JSON.parse(dados)
   }

   const agora = new Date()

   const data = agora.toLocaleDateString("pt-BR")

   const hora = agora.toLocaleTimeString("pt-BR",{
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit"
   })

   const novoGrupo = {
    id: Date.now(),
    data: data,
    hora: hora,
    quantidade: jogosGerados.length,
    jogos: jogosGerados
   }

   historico.push(novoGrupo)

   await AsyncStorage.setItem(
    "historicoJogos",
    JSON.stringify(historico)
   )

  }catch(error){

   console.log("erro salvar historico", error)

  }

 }

 return(

  <View style={styles.container}>

   <Text style={styles.title}>
    GERAR JOGOS
   </Text>

   <Text style={styles.section}>
    Quantidade
   </Text>

   <View style={styles.grid}>

    {quantidades.map(q => (

     <TouchableOpacity
      key={q}
      style={[
       styles.box,
       quantidade === q && styles.selected
      ]}
      onPress={()=>setQuantidade(q)}
     >

      <Text style={styles.text}>{q}</Text>

     </TouchableOpacity>

    ))}

   </View>

   <Text style={styles.section}>
    Distribuição Par / Ímpar
   </Text>

   <View style={styles.filtros}>

    {[6,7,8,9].map(p => (

     <TouchableOpacity
      key={p}
      style={styles.filtroItem}
      onPress={()=>togglePares(p)}
     >

      <Text style={styles.option}>
       {pares.includes(p) ? "☑" : "☐"} {p} pares / {15-p} ímpares
      </Text>

     </TouchableOpacity>

    ))}

   </View>

   <Text style={styles.section}>
    Repetidas do último concurso
   </Text>

   <View style={styles.filtros}>

    {[7,8,9,10,11].map(r => (

     <TouchableOpacity
      key={r}
      style={styles.filtroItem}
      onPress={()=>toggleRepetidas(r)}
     >

      <Text style={styles.option}>
       {repetidas.includes(r) ? "☑" : "☐"} {r} repetidas
      </Text>

     </TouchableOpacity>

    ))}

   </View>

   <TouchableOpacity
    style={styles.button}
    onPress={gerar}
   >

    <Text style={styles.buttonText}>
     GERAR JOGOS
    </Text>

   </TouchableOpacity>

  </View>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  paddingHorizontal:12,
 
  
 },

 title:{
  fontSize:18,
  fontWeight:"bold",
  textAlign:"center",
  marginBottom:1
 },

 section:{
  fontSize:15,
  marginTop:8,
  marginBottom:4
 },

 grid:{
  flexDirection:"row",
  flexWrap:"wrap",
  justifyContent:"center"
 },

 box:{
  width:55,
  height:34,
  borderWidth:1,
  borderColor:"#ccc",
  borderRadius:6,
  alignItems:"center",
  justifyContent:"center",
  margin:3
 },

 selected:{
  backgroundColor:"#0a7ea4"
 },

 text:{
  fontSize:13
 },

 filtros:{
  marginBottom:6
 },

 filtroItem:{
  paddingVertical:3
 },

 option:{
  fontSize:13
 },

 button:{
  marginTop:12,
  backgroundColor:"#0a7ea4",
  paddingVertical:10,
  borderRadius:8,
  alignItems:"center"
 },

 buttonText:{
  color:"#fff",
  fontWeight:"bold",
  fontSize:14
 }

})