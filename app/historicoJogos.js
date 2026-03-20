import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { useRouter } from "expo-router"
import { useCallback, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { exportarPDF } from "../utils/exportarPDF"

export default function HistoricoJogos(){

 const router = useRouter()

 const [historico,setHistorico] = useState([])
 const [abertos,setAbertos] = useState({})

 useFocusEffect(
  useCallback(()=>{
   carregarHistorico()
  },[])
 )

 async function carregarHistorico(){

  try{

   const dados = await AsyncStorage.getItem("historicoJogos")

   if(dados){
    setHistorico(JSON.parse(dados))
   }

  }catch(e){
   console.log("Erro histórico",e)
  }

 }

 function toggle(index){

  setAbertos(prev => ({
   ...prev,
   [index]: !prev[index]
  }))

 }

 function conferirGrupo(grupo){

  router.push({
   pathname:"/conferidor",
   params:{
    id:grupo.id,
    jogos:JSON.stringify(grupo.jogos)
   }
  })

 }

 async function exportarGrupo(grupo){

  const plano = await AsyncStorage.getItem("planoUsuario")

  if(plano !== "pro"){

   Alert.alert(
    "Função PRO",
    "Exportação em PDF disponível apenas no plano PRO."
   )

   return
  }

  try{

   await exportarPDF(
    grupo.jogos,
    grupo.resultado,
    grupo.data,
    grupo.hora
   )

  }catch(e){

   console.log("Erro exportar",e)

  }

 }

 async function limparHistorico(){

  Alert.alert(
   "Limpar histórico",
   "Deseja apagar todo o histórico?",
   [
    {text:"Cancelar",style:"cancel"},
    {
     text:"Apagar",
     onPress:async()=>{

      await AsyncStorage.removeItem("historicoJogos")

      setHistorico([])
      setAbertos({})

     }
    }
   ]
  )

 }

 return(

  <View style={styles.container}>

   <Text style={styles.title}>
    HISTÓRICO DE JOGOS
   </Text>

   <ScrollView>

    {historico.map((grupo,index)=>(

     <View key={index} style={styles.grupo}>

      <TouchableOpacity onPress={()=>toggle(index)}>

      <View style={{ flexDirection: "row", alignItems: "center" }}>

  <Text style={{ fontSize: 22, marginRight: 8 }}>
    {abertos[index] ? "▼" : "▶"}
  </Text>

  <Text style={styles.cabecalho}>
    Grupo {index+1} • {grupo.data} {grupo.hora} • {grupo.quantidade} jogos
  </Text>

</View>

      </TouchableOpacity>

      <View style={styles.botoesGrupo}>

       <TouchableOpacity
        style={styles.botao}
        onPress={()=>conferirGrupo(grupo)}
       >
        <Text style={styles.botaoTexto}>
         CONFERIR
        </Text>
       </TouchableOpacity>

       <TouchableOpacity
        style={styles.botao}
        onPress={()=>exportarGrupo(grupo)}
       >
        <Text style={styles.botaoTexto}>
         EXPORT PDF
        </Text>
       </TouchableOpacity>

      </View>

      {abertos[index] && (

       <View style={styles.listaJogos}>

        {grupo.resultado && (

         <Text style={styles.resultado}>
          Resultado → {grupo.resultado.join(" ")}
         </Text>

        )}

        {grupo.jogos.map((jogo,i)=>{

         const dezenas = Array.isArray(jogo) ? jogo : jogo.dezenas
         const acertos = jogo.acertos

         return(

          <View key={i} style={styles.jogoContainer}>

           <Text style={styles.jogoNumero}>
            {i+1} →
           </Text>

           <View style={styles.linhaNumeros}>

            {dezenas.map((num,idx)=>{

             const acertou = grupo.resultado?.includes(num)

             return(

              <Text
               key={idx}
               style={acertou ? styles.numeroAcerto : styles.numero}
              >
               {num.toString().padStart(2,"0")}{" "}
              </Text>

             )

            })}

            {acertos !== undefined && (

             <Text style={styles.acertos}>
              ({acertos} acertos)
             </Text>

            )}

           </View>

          </View>

         )

        })}

       </View>

      )}

     </View>

    ))}

   </ScrollView>

   <TouchableOpacity
    style={styles.botaoLimpar}
    onPress={limparHistorico}
   >
    <Text style={styles.botaoTexto}>
     LIMPAR HISTÓRICO
    </Text>
   </TouchableOpacity>

  </View>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:20,
  backgroundColor:"#fff"
 },

 title:{
  fontSize:22,
  fontWeight:"bold",
  textAlign:"center",
  marginBottom:20
 },

 grupo:{
  marginBottom:15,
  borderWidth:1,
  borderColor:"#ddd",
  borderRadius:8,
  padding:2
 },

 cabecalho:{
  fontSize:16,
  fontWeight:"bold"
 },

 botoesGrupo:{
  flexDirection:"row",
  gap:10,
  marginTop:10
 },

 botao:{
  backgroundColor:"#0a7ea4",
  padding:8,
  borderRadius:6
 },

 botaoTexto:{
  color:"#fff",
  fontWeight:"bold"
 },

 listaJogos:{
 marginTop:10,
 paddingHorizontal:15,
 paddingBottom:10
},

 resultado:{
  fontWeight:"bold",
  marginBottom:10,
  fontSize:15
 },

 jogoContainer:{
 flexDirection:"row",
 marginBottom:6,
 paddingBottom:6,
 borderBottomWidth:1,
 borderBottomColor:"#ddd"
},

 jogoNumero:{
  fontSize:13,
  
 },

 linhaNumeros:{
  flexDirection:"row",
  flexWrap:"wrap"
 },

 numero:{
  fontSize:13,
  color:"#333"
 },

 numeroAcerto:{
  fontSize:13,
  color:"green",
  fontWeight:"bold"
 },

 acertos:{
  marginLeft:6,
  fontWeight:"bold"
 },

 botaoLimpar:{
  backgroundColor:"#b00020",
  padding:12,
  borderRadius:8,
  marginTop:10,
  alignItems:"center"
 }

})

