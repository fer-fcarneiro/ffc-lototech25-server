import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const larguraTela = Dimensions.get("window").width
const larguraTab = larguraTela / 4

export default function CustomTabBar({ state, descriptors, navigation }){

return(

<View style={styles.container}>

<ScrollView
 horizontal
 showsHorizontalScrollIndicator={false}
 contentContainerStyle={styles.scroll}
>

{state.routes.map((route,index)=>{

const { options } = descriptors[route.key]

const label =
 options.title !== undefined
 ? options.title
 : route.name

const isFocused = state.index === index

const onPress = () => {

 const event = navigation.emit({
  type:"tabPress",
  target:route.key,
  canPreventDefault:true
 })

 if(!isFocused && !event.defaultPrevented){
  navigation.navigate(route.name)
 }

}

return(

<TouchableOpacity
 key={route.key}
 onPress={onPress}
 style={[
  styles.tab,
  {width:larguraTab},
  isFocused && styles.ativa
 ]}
>

{options.tabBarIcon &&
 options.tabBarIcon({
  color:isFocused ? "#fff" : "#ddd",
  size:22
 })}

<Text style={styles.text}>
 {label}
</Text>

</TouchableOpacity>

)

})}

</ScrollView>

</View>

)

}

const styles = StyleSheet.create({

container:{
 height:70,
 backgroundColor:"#0a7ea4"
},

scroll:{
 flexDirection:"row",
 alignItems:"center"
},

tab:{
 justifyContent:"center",
 alignItems:"center",
 paddingVertical:6
},

ativa:{
 backgroundColor:"#08627f",
 borderRadius:8
},

text:{
 color:"#fff",
 fontSize:12,
 fontWeight:"600"
}

})