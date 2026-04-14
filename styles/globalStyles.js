import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  /*titulo: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },*/
  titulo: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    minHeight: 28,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 320,
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#333",
    width: "80%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    textAlign: "center",
  },
  jogo: {
    fontSize: 18,
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
});
