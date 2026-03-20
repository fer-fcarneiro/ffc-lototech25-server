
/*import { Stack } from "expo-router"

export default function Layout(){

 return(

  <Stack
   screenOptions={{
    headerStyle:{ backgroundColor:"#0a7ea4"},
    headerTintColor:"#fff",
    headerTitleAlign:"center"
   }}
  >

   <Stack.Screen 
    name="index"
    options={{ title: "Apresentação" }}
   />

   <Stack.Screen 
    name="historicoJogos"
    options={{ title: "Histórico" }}
   />

   <Stack.Screen 
    name="escolherDezenas"
    options={{ title: "Escolher Dezenas " }}
   />

   <Stack.Screen 
    name="resultadoAnterior"
    options={{ title: "Resultado Anterior" }}
   />

   <Stack.Screen 
    name="gerarJogos"
    options={{ title: "Gerar Jogos" }}
   />
   <Stack.Screen 
    name="conferidor"
    options={{ title: "Conferidor" }}
   />
   <Stack.Screen 
    name="cadastro"
    options={{ title: "Cadastro" }}
   />
   <Stack.Screen 
    name="login"
    options={{ title: "Login" }}
   />

  </Stack>

 )

} */
import { Stack } from "expo-router"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import MenuHorizontal from "../components/MenuHorizontal"

export default function Layout(){

 return(

  <View style={{ flex: 1 }}>

   {/* TELAS */}
   <View style={{ flex: 1 }}>
    <Stack
     screenOptions={{
      headerStyle:{ backgroundColor:"#0a7ea4"},
      headerTintColor:"#fff",
      headerTitleAlign:"center",
      headerBackVisible: false
     }}
    >

     <Stack.Screen name="index" options={{ title: "Apresentação" }} />
     <Stack.Screen name="historicoJogos" options={{ title: "Histórico" }} />
     <Stack.Screen name="escolherDezenas" options={{ title: "Escolher Dezenas " }} />
     <Stack.Screen name="resultadoAnterior" options={{ title: "Iniciar rodada" }} />
     <Stack.Screen name="gerarJogos" options={{ title: "Gerar Jogos" }} />
     <Stack.Screen name="conferidor" options={{ title: "Conferidor" }} />
     <Stack.Screen name="cadastro" options={{ title: "Cadastro" }} />
     <Stack.Screen name="login" options={{ title: "Login" }} />

    </Stack>
   </View>

   {/* MENU FIXO EMBAIXO */}
   <SafeAreaView
  edges={["bottom"]}
  style={{
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc"
  }}
>
  <MenuHorizontal />
</SafeAreaView>

  </View>

 )

}