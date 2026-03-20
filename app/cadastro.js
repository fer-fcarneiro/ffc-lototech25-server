
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import AppButton from "../components/AppButton"
import styles from "../styles/globalStyles"
import { BASE_URL } from "../utils/config"

export default function Cadastro(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [senha,setSenha] = useState("")
 const [confirmarSenha,setConfirmarSenha] = useState("")

 async function cadastrar(){

  if(!email || !senha){

   Alert.alert("Erro","Preencha email e senha")
   return

  }

  if(senha !== confirmarSenha){

   Alert.alert("Erro","Senhas não conferem")
   return

  }

  try{

   const response = await fetch(`${BASE_URL}/users`, {
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({
     email,
     senha
    })
   })

   const data = await response.json()

   console.log("CADASTRO:",data)

   if(response.ok){

    Alert.alert(
     "Conta criada",
     "Cadastro realizado com sucesso",
     [
      {
       text:"OK",
       onPress:()=>router.replace("/login")
      }
     ]
    )

   }else{

    Alert.alert("Erro",data.erro || "Erro no cadastro")

   }

  }catch(error){

   console.log(error)

   Alert.alert("Erro","Falha ao conectar servidor")

  }

 }

 return(

  <View style={styles.container}>

   <Text style={{
    fontSize:28,
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:30
   }}>
    FFC LotoTech25
   </Text>

   <View style={{
    backgroundColor:"#fff",
    padding:20,
    borderRadius:10,
    width:"100%",
    maxWidth:400,
    alignSelf:"center",
    elevation:3
   }}>

    <Text style={{
     fontSize:20,
     fontWeight:"bold",
     marginBottom:20,
     textAlign:"center"
    }}>
     Criar Conta
    </Text>

    <TextInput
     placeholder="Seu email"
     value={email}
     onChangeText={setEmail}
     style={{
      borderWidth:1,
      borderColor:"#ccc",
      padding:12,
      borderRadius:8,
      marginBottom:15
     }}
    />

    <TextInput
     placeholder="Senha"
     value={senha}
     onChangeText={setSenha}
     secureTextEntry
     style={{
      borderWidth:1,
      borderColor:"#ccc",
      padding:12,
      borderRadius:8,
      marginBottom:15
     }}
    />

    <TextInput
     placeholder="Confirmar senha"
     value={confirmarSenha}
     onChangeText={setConfirmarSenha}
     secureTextEntry
     style={{
      borderWidth:1,
      borderColor:"#ccc",
      padding:12,
      borderRadius:8,
      marginBottom:20
     }}
    />

    <AppButton
     title="Cadastrar"
     onPress={cadastrar}
    />

    <TouchableOpacity
     onPress={()=>router.replace("/login")}
     style={{marginTop:20}}
    >
     <Text style={{
      textAlign:"center",
      color:"#0a7ea4",
      fontWeight:"bold"
     }}>
      Já tenho uma conta
     </Text>
    </TouchableOpacity>

   </View>

  </View>

 )

}