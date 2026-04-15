import AsyncStorage from "@react-native-async-storage/async-storage"; // 🔥 NOVO
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppButton from "../components/AppButton";
import styles from "../styles/globalStyles";
import { BASE_URL } from "../utils/config";

export default function Cadastro() {
  const router = useRouter();

  // 🔥 recebe o plano vindo do index
  const { plano: planoParam } = useLocalSearchParams();

  // 🔥 define o plano (default = free)
  const [plano, setPlano] = useState(planoParam || "free");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function cadastrar() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "Senhas não conferem");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          senha: senha.trim(),
          plano, // 🔥 free ou pro
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      console.log("CADASTRO RESPONSE:", data);
      console.log("PLANO USADO:", plano);

      if (response.ok) {
        // 🔥 PADRÃO CORRETO DE STORAGE
        await AsyncStorage.setItem("usuarioId", data.id);
        await AsyncStorage.setItem("plano", data.plano);

        // 🔥 limpar chave antiga (evita bug)
        await AsyncStorage.removeItem("userId");

        console.log("SALVO NO STORAGE:", data.id);

        // 🔥 TESTE IMEDIATO
        const teste = await AsyncStorage.getItem("usuarioId");
        console.log("🧪 TESTE STORAGE:", teste);

        Alert.alert(
          "Conta criada",
          `Cadastro realizado com sucesso (${plano.toUpperCase()})`,
          [
            {
              text: "OK",
              onPress: () => router.replace("/login"),
            },
          ],
        );
      } else {
        Alert.alert("Erro", data.erro || "Erro no cadastro");
      }
    } catch (error) {
      console.log("❌ ERRO CADASTRO:", error);
      Alert.alert("Erro", "Falha ao conectar servidor");
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
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Criar Conta
        </Text>

        {/* 🔥 MOSTRA O PLANO */}
        <Text
          style={{
            textAlign: "center",
            marginBottom: 15,
            fontWeight: "bold",
            color: plano === "pro" ? "#0a7ea4" : "#555",
          }}
        >
          Plano selecionado: {plano.toUpperCase()}
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
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 15,
          }}
        />

        <TextInput
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
          }}
        />

        <AppButton title="Cadastrar" onPress={cadastrar} />

        <TouchableOpacity
          onPress={() => router.replace("/login")}
          style={{ marginTop: 20 }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#0a7ea4",
              fontWeight: "bold",
            }}
          >
            Já tenho uma conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
