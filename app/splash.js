import { useRouter } from "expo-router"
import { useEffect } from "react"
import { Image, StyleSheet, View } from "react-native"

export default function Splash(){

 const router = useRouter()

 useEffect(()=>{

  setTimeout(()=>{

   router.replace("/")

  },2000)

 },[])

 return(

  <View style={styles.container}>

   <Image
    source={require("../assets/splashNovo.png")}
    style={styles.logo}
    resizeMode="contain"
   />

  </View>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:"#0a7ea4",
  justifyContent:"center",
  alignItems:"center"
 },

 logo:{
  width:750,
  height:750
 }

})