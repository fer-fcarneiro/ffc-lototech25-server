import { StyleSheet, Text, TouchableOpacity } from "react-native"

export default function AppButton({ title, onPress }) {

 return (
  <TouchableOpacity style={styles.button} onPress={onPress}>
   <Text style={styles.text}>
    {title}
   </Text>
  </TouchableOpacity>
 )
}

const styles = StyleSheet.create({

 button:{
  backgroundColor:"#0a7ea4",
  paddingVertical:15,
  paddingHorizontal:30,
  borderRadius:10,
  alignItems:"center",
  marginVertical:10
 },

 text:{
  color:"#fff",
  fontSize:10,
  fontWeight:"bold"
 }

})