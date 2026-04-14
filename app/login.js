import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppButton from "../components/AppButton";
import styles from "../styles/globalStyles";
import { BASE_URL } from "../utils/config";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar() {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await response.json();

      console.log("RESPOSTA SERVIDOR:", data);

      if (response.ok) {
        /*
    await AsyncStorage.setItem("usuarioId", data.id.toString())
    await AsyncStorage.setItem("emailUsuario", data.email)
    await AsyncStorage.setItem("planoUsuario", data.plano) */
        await AsyncStorage.setItem("usuarioId", data.id.toString());
        await AsyncStorage.setItem("email", data.email);
        await AsyncStorage.setItem("plano", data.plano);

        // 🔥 DEBUG CORRETO
        const id = await AsyncStorage.getItem("usuarioId");
        console.log("🆔 ID SALVO:", id);

        if (data.plano === "aguardando_pagamento") {
          Alert.alert(
            "Plano PRO",
            "Pagamento em análise. Enquanto isso você continua usando o plano FREE.",
            [
              {
                text: "OK",
                onPress: () => router.replace("/resultadoAnterior"),
              },
            ],
          );

          return;
        }

        Alert.alert("Sucesso", "Login realizado com sucesso", [
          {
            text: "OK",
            onPress: () => router.replace("/resultadoAnterior"),
          },
        ]);
      } else {
        Alert.alert("Erro", data.erro || "Email ou senha inválidos");
      }
    } catch (error) {
      console.log("ERRO:", error);

      Alert.alert("Erro", "Falha ao conectar com servidor");
    }
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        FFC LotoTech25
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          width: "100%",
          maxWidth: 400,
          alignSelf: "center",
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Login
        </Text>

        <TextInput
          placeholder="Seu email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 15,
          }}
        />

        <TextInput
          placeholder="Sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
          }}
        />

        <AppButton title="Entrar" onPress={entrar} />

        <TouchableOpacity
          onPress={() => router.push("/cadastro")}
          style={{ marginTop: 20 }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#0a7ea4",
              fontWeight: "bold",
            }}
          >
            Criar nova conta Pró
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
