
/*import { Stack } from "expo-router"

export default function Layout(){

 return(

  <Stack
   screenOptions={{
    headerStyle:{ backgroundColor:"#0a7ea4"},
    headerTintColor:"#fff",
    headerTitleAlign:"center"
   }}
  />

 )

}*/
import { Stack } from "expo-router"

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

}