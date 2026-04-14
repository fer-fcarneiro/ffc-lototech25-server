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

// VERSÃO 2

/*import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuHorizontal from "../components/MenuHorizontal";
import { ProProvider } from "../context/ProContext";

export default function Layout() {
  return (
    <ProProvider>
      <View style={{ flex: 1 }}>
        {/* TELAS */ /*}
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "#0a7ea4" },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerBackVisible: false,
            }}
          >
            <Stack.Screen name="index" options={{ title: "Apresentação" }} />
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
              options={{ title: "Iniciar rodada" }}
            />
            <Stack.Screen
              name="gerarJogos"
              options={{ title: "Gerar Jogos" }}
            />
            <Stack.Screen name="conferidor" options={{ title: "Conferidor" }} />
            <Stack.Screen name="cadastro" options={{ title: "Cadastro" }} />
            <Stack.Screen name="login" options={{ title: "Login" }} />
          </Stack>
        </View>

        {/* MENU FIXO EMBAIXO */ /*}
        <SafeAreaView
          edges={["bottom"]}
          style={{
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderColor: "#ccc",
          }}
        >
          <MenuHorizontal />
        </SafeAreaView>
      </View>
    </ProProvider>
  );
}
*/
//VERSÃO 3

import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MenuHorizontal from "../components/MenuHorizontal";
import { ProProvider } from "../context/ProContext";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  return (
    <ProProvider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "#0a7ea4" },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerBackVisible: false,
            }}
          >
            <Stack.Screen name="index" options={{ title: "Apresentação" }} />
            <Stack.Screen
              name="historicoJogos"
              options={{ title: "Histórico" }}
            />
            <Stack.Screen
              name="escolherDezenas"
              options={{ title: "Escolher Dezenas" }}
            />
            <Stack.Screen
              name="resultadoAnterior"
              options={{ title: "Iniciar rodada" }}
            />
            <Stack.Screen
              name="gerarJogos"
              options={{ title: "Gerar Jogos" }}
            />
            <Stack.Screen name="conferidor" options={{ title: "Conferidor" }} />
            <Stack.Screen name="cadastro" options={{ title: "Cadastro" }} />
            <Stack.Screen name="login" options={{ title: "Login" }} />
          </Stack>
        </View>

        <SafeAreaView
          edges={["bottom"]}
          style={{
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderColor: "#ccc",
          }}
        >
          <MenuHorizontal />
        </SafeAreaView>
      </View>
    </ProProvider>
  );
}
