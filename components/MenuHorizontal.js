import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import AppButton from "./AppButton"

export default function MenuHorizontal() {

 const router = useRouter()

 return (
  <ScrollView
   horizontal
   showsHorizontalScrollIndicator={false}
   contentContainerStyle={{ paddingHorizontal:10 }}
  >
    <View style={{alignItems:"center", marginRight:25}}>
    <Ionicons name="home" size={30} color="#0a7ea4"/>
    <AppButton title="Apresentação" onPress={()=>router.replace("/")} />
   </View>

   <View style={{alignItems:"center", marginRight:25}}>
    <Ionicons name="trophy" size={30} color="#0a7ea4"/>
    <AppButton title="Iniciar rodada" onPress={()=>router.push("/resultadoAnterior")} />
   </View>

   <View style={{alignItems:"center", marginRight:25}}>
    <Ionicons name="star" size={30} color="#0a7ea4"/>
    <AppButton title="Escolher Dezenas" onPress={()=>router.push("/escolherDezenas")} />
   </View>

   <View style={{alignItems:"center", marginRight:25}}>
    <Ionicons name="shuffle" size={30} color="#0a7ea4"/>
    <AppButton title="Gerar Jogos" onPress={()=>router.push("/gerarJogos")} />
   </View>

   <View style={{alignItems:"center", marginRight:25}}>
    <Ionicons name="time" size={30} color="#0a7ea4"/>
    <AppButton title="Histórico jogos" onPress={()=>router.push("/historicoJogos")} />
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
 )
}