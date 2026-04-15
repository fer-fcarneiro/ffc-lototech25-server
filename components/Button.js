import { Text, TouchableOpacity } from "react-native"

export default function Button({ numero, selecionado, onPress }) {

 return (
  <TouchableOpacity
   onPress={onPress}
   style={{
    width: 55,
    height: 55,
    margin: 3,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: selecionado ? "#2ecc71" : "#fff"
   }}
  >
   <Text style={{ fontWeight: "bold" }}>
    {numero}
   </Text>
  </TouchableOpacity>
 )
}