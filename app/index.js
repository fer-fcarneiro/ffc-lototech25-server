 /* import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native"

import AppButton from "../components/AppButton"
import styles from "../styles/globalStyles"
import { verificarPlanoServidor } from "../utils/verificarPlanoServidor"



export default function Index() {

 const router = useRouter()
 const [plano,setPlano] = useState("free")

 useEffect(()=>{

  async function carregarPlano(){

   const planoServidor = await verificarPlanoServidor()
   setPlano(planoServidor)

  }

  carregarPlano()

 },[])

 function ativarPro(){

  Alert.alert(
   "FFC LotoTech25 PRO",
   "Vantagens do plano PRO:\n\n" +
   "✔ Gerar até 500 apostas\n" +
   "✔ Exportar histórico em PDF\n" +
   "✔ Filtros avançados\n" +
   "✔ Escolher dezenas manualmente\n" +
   "✔ Controle de pares e ímpares\n",
   [
    { text:"Cancelar" },
    { text:"Ativar PRO", onPress:()=>router.push("/login") }
   ]
  )

 }
 function abrirSuporte(){
 Linking.openURL("https://fer-fcarneiro.github.io/FFC.dev.apps/")
}

 return (

<ScrollView
 style={{flex:1}}
 contentContainerStyle={{ paddingBottom:120 }}
>

 <View style={styles.container}>

  <Text style={styles.titulo}>
   FFC LotoTech25
  </Text>

  <Text style={{ textAlign:"center", marginBottom:20 }}>
   Gerador inteligente com filtros estatísticos para jogos da Lotofácil 
   e conferidor atualizando automaticamente histórico de jogos gerados.
  </Text>

  <Text style={styles.titulo}> Plano Free</Text>

  <Text>✔ Soma entre 185 até 228 .</Text>
  <Text>✔ Repetidos entre 7 até 11 .</Text>
  <Text>✔ Escolher até 18 dezenas . </Text>

  <Text style={{ marginTop:20, textAlign:"center" }}>
   O aplicativo utiliza organização matemática e padrões
   estatísticos observados em concursos anteriores
   para ajudar na geração de jogos mais equilibrados.
  </Text>

  <Text style={{
   marginTop:15,
   textAlign:"center",
   fontSize:13,
   color:"#d84949"
  }}>
   Atenção: este aplicativo é apenas uma ferramenta de apoio
   matemático e estatístico. Não garante prêmios ou acertos,
   pois os resultados das loterias são aleatórios.
  </Text>

  <TouchableOpacity onPress={abrirSuporte}>
 <Text style={{textAlign:"center",color:"#0a7ea4"}}>
  Suporte
 </Text>
</TouchableOpacity>

  <AppButton
   title="Entrar"
   onPress={() => router.push("/resultadoAnterior")}
  />

  {/* ÁREA PRO *//*}

  <View style={{ marginTop:30 }}>

   <Text style={{
    textAlign:"center",
    fontWeight:"bold",
    fontSize:16
   }}>
    ⭐ FFC LotoTech25 PRO
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Escolher 6 até 9 pares
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ GERAR até 500 apostas por grupo
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Filtros avançados
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Escolher até 25 dezenas
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Exportar histórico em PDF
   </Text>

   {plano !== "pro" && (

    <View style={{ marginTop:10 }}>
     <AppButton
      title="Ativar Plano PRO"
      onPress={ativarPro}
     />
    </View>

   )}

   {plano === "pro" && (

    <Text style={{
     textAlign:"center",
     marginTop:15,
     fontWeight:"bold",
     color:"green"
    }}>
     ⭐ Plano PRO ativo
    </Text>

   )}

  </View>

  {/* LINHA SEPARADORA *//*}

  <View
   style={{
    height:1,
    backgroundColor:"#e0e0e0",
    marginVertical:20
   }}
  />

  {/* MENU ROLÁVEL *//*}

  <View
   style={{
    backgroundColor:"#f3f2f2",
    paddingVertical:8,
    borderRadius:5,
    
   }}
  >

   <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal:10 }}
   >

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="trophy" size={30} color="#0a7ea4"/>
     <AppButton title="Resultado Anterior" onPress={()=>router.push("/resultadoAnterior")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="grid" size={30} color="#0a7ea4"/>
     <AppButton title="Escolher Dezenas" onPress={()=>router.push("/escolherDezenas")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="shuffle" size={30} color="#0a7ea4"/>
     <AppButton title="Gerar Jogos" onPress={()=>router.push("/gerarJogos")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="time" size={30} color="#0a7ea4"/>
     <AppButton title="Histórico jogos " onPress={()=>router.push("/historicoJogos")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="checkmark-circle" size={30} color="#0a7ea4"/>
     <AppButton title="Conferidor" onPress={()=>router.push("/conferidor")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="person-add" size={30} color="#0a7ea4"/>
     <AppButton title="Cadastro" onPress={()=>router.push("/cadastro")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="log-in" size={30} color="#0a7ea4"/>
     <AppButton title="Login" onPress={()=>router.push("/login")} />
    </View>

   </ScrollView>

  </View>

 </View>

</ScrollView>

 )

}*/
// index 2

/*
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native"

import AppButton from "../components/AppButton"
import styles from "../styles/globalStyles"
import { verificarPlanoServidor } from "../utils/verificarPlanoServidor"

export default function Index() {

 const router = useRouter()
 const [plano,setPlano] = useState("free")
 const [carregando,setCarregando] = useState(true)

 useEffect(()=>{

  async function carregarPlano(){

   const planoServidor = await verificarPlanoServidor()
   setPlano(planoServidor)

   setTimeout(()=>{
    setCarregando(false)
   },4000)

  }

  carregarPlano()

 },[])

 function ativarPro(){

  Alert.alert(
   "FFC LotoTech25 PRO",
   "Vantagens do plano PRO:\n\n" +
   "✔ Gerar até 500 apostas\n" +
   "✔ Exportar histórico em PDF\n" +
   "✔ Filtros avançados\n" +
   "✔ Escolher dezenas manualmente\n" +
   "✔ Controle de pares e ímpares\n",
   [
    { text:"Cancelar" },
    { text:"Ativar PRO", onPress:()=>router.push("/login") }
   ]
  )

 }

 function abrirSuporte(){
  Linking.openURL("https://fer-fcarneiro.github.io/FFC.dev.apps/")
 }

 // SPLASH
 if(carregando){

  return(

   <View style={{
    flex:1,
    backgroundColor:"#0a7ea4",
    justifyContent:"center",
    alignItems:"center"
   }}>

    <Image
     source={require("../assets/splash.png")}
     style={{width:300,height:300}}
     resizeMode="contain"
    />

   </View>

  )

 }

 return (

<ScrollView
 style={{flex:1}}
 contentContainerStyle={{ paddingBottom:120 }}
>

 <View style={styles.container}>

  <Text style={styles.titulo}>
   FFC LotoTech25
  </Text>

  <Text style={{ textAlign:"center", marginBottom:20 }}>
   Gerador inteligente com filtros estatísticos para jogos da Lotofácil 
   e conferidor atualizando automaticamente histórico de jogos gerados.
  </Text>

  <Text style={styles.titulo}> Plano Free</Text>

  <Text>✔ Soma entre 185 até 228 .</Text>
  <Text>✔ Repetidos entre 7 até 11 .</Text>
  <Text>✔ Escolher até 18 dezenas . </Text>

  <Text style={{ marginTop:20, textAlign:"center" }}>
   O aplicativo utiliza organização matemática e padrões
   estatísticos observados em concursos anteriores
   para ajudar na geração de jogos mais equilibrados.
  </Text>

  <Text style={{
   marginTop:15,
   textAlign:"center",
   fontSize:13,
   color:"#d84949"
  }}>
   Atenção: este aplicativo é apenas uma ferramenta de apoio
   matemático e estatístico. Não garante prêmios ou acertos,
   pois os resultados das loterias são aleatórios.
  </Text>

  <TouchableOpacity onPress={abrirSuporte}>
   <Text style={{textAlign:"center",color:"#0a7ea4"}}>
    Suporte
   </Text>
  </TouchableOpacity>

  <AppButton
   title="Entrar"
   onPress={() => router.push("/resultadoAnterior")}
  />

  {/* ÁREA PRO *//*}

  <View style={{ marginTop:30 }}>

   <Text style={{
    textAlign:"center",
    fontWeight:"bold",
    fontSize:16
   }}>
    ⭐ FFC LotoTech25 PRO
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Escolher 6 até 9 pares
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ GERAR até 500 apostas por grupo
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Filtros avançados
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Escolher até 25 dezenas
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Exportar histórico em PDF
   </Text>

   {plano !== "pro" && (

    <View style={{ marginTop:10 }}>
     <AppButton
      title="Ativar Plano PRO"
      onPress={ativarPro}
     />
    </View>

   )}

   {plano === "pro" && (

    <Text style={{
     textAlign:"center",
     marginTop:15,
     fontWeight:"bold",
     color:"green"
    }}>
     ⭐ Plano PRO ativo
    </Text>

   )}

  </View>

  {/* LINHA SEPARADORA *//*}

  <View
   style={{
    height:1,
    backgroundColor:"#e0e0e0",
    marginVertical:20
   }}
  />

  {/* MENU ROLÁVEL *//*}

  <View
   style={{
    backgroundColor:"#f3f2f2",
    paddingVertical:8,
    borderRadius:5,
   }}
  >

   <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal:10 }}
   >

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="trophy" size={30} color="#0a7ea4"/>
     <AppButton title="Resultado Anterior" onPress={()=>router.push("/resultadoAnterior")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="grid" size={30} color="#0a7ea4"/>
     <AppButton title="Escolher Dezenas" onPress={()=>router.push("/escolherDezenas")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="shuffle" size={30} color="#0a7ea4"/>
     <AppButton title="Gerar Jogos" onPress={()=>router.push("/gerarJogos")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="time" size={30} color="#0a7ea4"/>
     <AppButton title="Histórico jogos " onPress={()=>router.push("/historicoJogos")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="checkmark-circle" size={30} color="#0a7ea4"/>
     <AppButton title="Conferidor" onPress={()=>router.push("/conferidor")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="person-add" size={30} color="#0a7ea4"/>
     <AppButton title="Cadastro" onPress={()=>router.push("/cadastro")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="log-in" size={30} color="#0a7ea4"/>
     <AppButton title="Login" onPress={()=>router.push("/login")} />
    </View>

   </ScrollView>

  </View>

 </View>

</ScrollView>

 )

}
*/

// index 3 
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, Animated, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native"

import AppButton from "../components/AppButton"
import styles from "../styles/globalStyles"
import { verificarPlanoServidor } from "../utils/verificarPlanoServidor"

export default function Index() {

 const router = useRouter()

 const [plano,setPlano] = useState("free")
 const [carregando,setCarregando] = useState(true)

 const fadeAnim = useState(new Animated.Value(0))[0]

 useEffect(()=>{

  async function carregarPlano(){

   const planoServidor = await verificarPlanoServidor()
   setPlano(planoServidor)

   setTimeout(()=>{
    setCarregando(false)
   },4000)

  }

  carregarPlano()

  Animated.timing(fadeAnim,{
   toValue:1,
   duration:4000,
   useNativeDriver:true
  }).start()

 },[])

 function ativarPro(){

  Alert.alert(
   "FFC LotoTech25 PRO",
   "Vantagens do plano PRO:\n\n" +
   "✔ Gerar até 500 apostas\n" +
   "✔ Exportar histórico em PDF\n" +
   "✔ Filtros avançados\n" +
   "✔ Escolher dezenas manualmente\n" +
   "✔ Controle de pares e ímpares\n",
   [
    { text:"Cancelar" },
    { text:"Ativar PRO", onPress:()=>router.push("/login") }
   ]
  )

 }

 function abrirSuporte(){
  Linking.openURL("https://fer-fcarneiro.github.io/FFC.dev.apps/")
 }

 if(carregando){

  return(

   <View style={{
    flex:1,
    backgroundColor:"#0a7ea4",
    justifyContent:"center",
    alignItems:"center"
   }}>

    <Animated.Image
     source={require("../assets/splash.png")}
     style={{
      width:300,
      height:300,
      opacity:fadeAnim,
      transform:[{ scale: fadeAnim }]
     }}
     resizeMode="contain"
    />

   </View>

  )

 }

 return (

<ScrollView
 style={{flex:1}}
 contentContainerStyle={{ paddingBottom:120 }}
>

 <View style={styles.container}>

  <Text style={styles.titulo}>
   FFC LotoTech25
  </Text>

  <Text style={{ textAlign:"center", marginBottom:20 }}>
   Gerador inteligente com filtros estatísticos para jogos da Lotofácil 
   e conferidor atualizando automaticamente histórico de jogos gerados.
  </Text>

  <Text style={styles.titulo}> Plano Free</Text>

  <Text>✔ Soma entre 185 até 228 .</Text>
  <Text>✔ Repetidos entre 7 até 11 .</Text>
  <Text>✔ Escolher até 18 dezenas . </Text>

  <Text style={{ marginTop:20, textAlign:"center" }}>
   O aplicativo utiliza organização matemática e padrões
   estatísticos observados em concursos anteriores
   para ajudar na geração de jogos mais equilibrados.
  </Text>

  <Text style={{
   marginTop:15,
   textAlign:"center",
   fontSize:13,
   color:"#d84949"
  }}>
   Atenção: este aplicativo é apenas uma ferramenta de apoio
   matemático e estatístico. Não garante prêmios ou acertos,
   pois os resultados das loterias são aleatórios.
  </Text>

  <TouchableOpacity onPress={abrirSuporte}>
   <Text style={{textAlign:"center",color:"#0a7ea4"}}>
    Suporte
   </Text>
  </TouchableOpacity>

  <AppButton
   title="Entrar"
   onPress={() => router.push("/resultadoAnterior")}
  />

  {/* ÁREA PRO */}

  <View style={{ marginTop:30 }}>

   <Text style={{
    textAlign:"center",
    fontWeight:"bold",
    fontSize:16
   }}>
    ⭐ FFC LotoTech25 PRO
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Escolher 6 até 9 pares
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ GERAR até 500 apostas por grupo
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Filtros avançados
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Escolher até 25 dezenas
   </Text>

   <Text style={{ textAlign:"center" }}>
    ✔ Exportar histórico em PDF
   </Text>

   {plano !== "pro" && (

    <View style={{ marginTop:10 }}>
     <AppButton
      title="Ativar Plano PRO"
      onPress={ativarPro}
     />
    </View>

   )}

   {plano === "pro" && (

    <Text style={{
     textAlign:"center",
     marginTop:15,
     fontWeight:"bold",
     color:"green"
    }}>
     ⭐ Plano PRO ativo
    </Text>

   )}

  </View>

  {/* LINHA SEPARADORA */}

  <View
   style={{
    height:1,
    backgroundColor:"#e0e0e0",
    marginVertical:20
   }}
  />

  {/* MENU ROLÁVEL */}

  <View
   style={{
    backgroundColor:"#f3f2f2",
    paddingVertical:8,
    borderRadius:5,
   }}
  >

   <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal:10 }}
   >

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="trophy" size={30} color="#0a7ea4"/>
     <AppButton title="Resultado Anterior" onPress={()=>router.push("/resultadoAnterior")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="grid" size={30} color="#0a7ea4"/>
     <AppButton title="Escolher Dezenas" onPress={()=>router.push("/escolherDezenas")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="shuffle" size={30} color="#0a7ea4"/>
     <AppButton title="Gerar Jogos" onPress={()=>router.push("/gerarJogos")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="time" size={30} color="#0a7ea4"/>
     <AppButton title="Histórico jogos " onPress={()=>router.push("/historicoJogos")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="checkmark-circle" size={30} color="#0a7ea4"/>
     <AppButton title="Conferidor" onPress={()=>router.push("/conferidor")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="person-add" size={30} color="#0a7ea4"/>
     <AppButton title="Cadastro" onPress={()=>router.push("/cadastro")} />
    </View>

    <View style={{alignItems:"center", marginRight:25}}>
     <Ionicons name="log-in" size={30} color="#0a7ea4"/>
     <AppButton title="Login" onPress={()=>router.push("/login")} />
    </View>

   </ScrollView>

  </View>

 </View>

</ScrollView>

 )

}