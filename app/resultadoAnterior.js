import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, Text, View } from "react-native"
import AppButton from "../components/AppButton"
import Button from "../components/Button"
import styles from "../styles/globalStyles"

export default function ResultadoAnterior() {

 const router = useRouter()
 const [numerosSelecionados, setNumerosSelecionados] = useState([])

 const numeros = Array.from({ length: 25 }, (_, i) => i + 1)

 function selecionarNumero(num) {

  setNumerosSelecionados(prev => {

   if (prev.includes(num)) return prev.filter(n => n !== num)
   if (prev.length >= 15) return prev

   return [...prev, num]

  })

 }

 async function continuar() {

  if (numerosSelecionados.length !== 15) {
   Alert.alert("Atenção", "Selecione exatamente 15 números.")
   return
  }

  try {

   const response = await fetch("https://ffc-lototech25-server.onrender.com/resultados", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
     concurso: Date.now(), // pode ajustar depois
     dezenas: numerosSelecionados.sort((a,b)=>a-b)
    })
   })

   if (response.status === 200) {

    Alert.alert("Sucesso", "Resultado salvo com sucesso!")
    router.push("/escolherDezenas")

   } else {

    Alert.alert("Erro", "Não foi possível salvar o resultado.")

   }

  } catch (error) {

   Alert.alert("Erro", "Falha ao conectar com o servidor.")

  }

 }

 return (
  <View style={styles.container}>

   <Text style={styles.titulo}>
   Inserir Resultado Passado Lotofacil ({numerosSelecionados.length}/15)
   </Text>

   <View style={styles.grid}>
    {numeros.map(num => (
     <Button
      key={num}
      numero={num}
      selecionado={numerosSelecionados.includes(num)}
      onPress={() => selecionarNumero(num)}
     />
    ))}
   </View>

   <AppButton
    title="Continuar"
    onPress={continuar}
    disabled={numerosSelecionados.length !== 15}
   />

  </View>
 )
}