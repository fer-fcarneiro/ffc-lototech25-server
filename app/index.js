// VERSÃO COMPLETA COM PRO TESTE EM SIMLAÇÃO DE PAGAMENTO FEITO - ABAIXO -
/*import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/AppButton";
import styles from "../styles/globalStyles";
import { verificarPlanoServidor } from "../utils/verificarPlanoServidor";

export default function Index() {
  const router = useRouter();

  const [plano, setPlano] = useState("free");
  const [carregando, setCarregando] = useState(true);

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    async function carregarPlano() {
      const planoServidor = await verificarPlanoServidor();
      setPlano(planoServidor);

      setTimeout(() => {
        setCarregando(false);
      }, 3000);
    }

    carregarPlano();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  async function simularAtivacaoPro(userId) {
    try {
      const response = await fetch(
        `https://ffc-lototech25-server-1.onrender.com/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ plano: "pro" }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao ativar");
      }

      setPlano("pro");

      Alert.alert("Sucesso", "Plano PRO ativado 🚀");
    } catch (err) {
      console.log("❌ ERRO:", err);
      Alert.alert("Erro", "Não foi possível ativar");
    }
  }
  async function ativarPro() {
    try {
      const userId = await AsyncStorage.getItem("usuarioId");

      if (!userId) {
        Alert.alert("Atenção", "Faça login para ativar o plano PRO");
        return;
      }

      Alert.alert(
        "FFC LotoTech25 PRO",
        "Você será redirecionado para o pagamento seguro da Google Play.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Continuar",
            onPress: async () => {
              try {
                // 🔥 FUTURO: aqui entra Google Play Billing
                console.log("👉 Iniciar compra do PRO");

                // 👉 TEMPORÁRIO (simulação)
                await simularAtivacaoPro(userId);
              } catch (err) {
                console.log("Erro na compra:", err);
                Alert.alert("Erro", "Falha ao iniciar pagamento");
              }
            },
          },
        ],
      );
    } catch (error) {
      console.log("❌ Erro ao ativar PRO:", error);
    }
  }

  function abrirSuporte() {
    Linking.openURL("https://fer-fcarneiro.github.io/FFC.dev.apps/");
  }

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0a7ea4",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.Image
          source={require("../assets/splashNovo.png")}
          style={{
            width: 680,
            height: 680,
            opacity: fadeAnim,
            transform: [{ scale: fadeAnim }],
          }}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>FFC LotoTech25</Text>

        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Gerador inteligente com filtros estatísticos para jogos da Lotofácil e
          conferidor com histórico automático de jogos gerados.
        </Text>

        {/* 📊 FREE */ /*}
        <Text style={styles.titulo}>Plano Free</Text>

        <Text>✔ Soma entre 185 até 228</Text>
        <Text>✔ Repetidos entre 7 até 11</Text>
        <Text>✔ Escolher até 17 dezenas</Text>

        {/* ⭐ PRO */ /*}
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            ⭐ FFC LotoTech25 PRO
          </Text>

          <Text style={{ textAlign: "center" }}>✔ Escolher 6 até 9 pares</Text>

          <Text style={{ textAlign: "center" }}>✔ Gerar até 500 apostas</Text>

          <Text style={{ textAlign: "center" }}>✔ Filtros avançados</Text>

          <Text style={{ textAlign: "center" }}>✔ Escolher até 25 dezenas</Text>

          <Text style={{ textAlign: "center" }}>
            ✔ Exportar histórico em PDF
          </Text>

          {plano === "pro" && (
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <Text style={{ fontWeight: "bold", color: "green" }}>
                ⭐ Plano PRO ativo
              </Text>
              <Text
                style={{ fontWeight: "bold", color: "green", marginTop: 8 }}
              >
                Clique Iniciar rodada
              </Text>
            </View>
          )}
        </View>

        {/* 🆕 CADASTRO FREE */ /*}
        <AppButton
          title="Criar conta FREE"
          onPress={() => router.push("/cadastro?plano=free")}
        />

        {/* 🔥 ATIVAR PRO */ /*}
        {plano === "free" && (
          <AppButton title="Ativar PRO" onPress={ativarPro} />
        )}

        {/* 🔐 LOGIN */
/*}
        <AppButton title="Entrar" onPress={() => router.push("/login")} />

        {/* INFO */ /*}
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          O aplicativo utiliza padrões estatísticos de concursos anteriores para
          gerar jogos mais equilibrados.
        </Text>

        <Text
          style={{
            marginTop: 15,
            textAlign: "center",
            fontSize: 13,
            color: "#d84949",
          }}
        >
          Atenção: este aplicativo é apenas uma ferramenta de apoio matemático e
          estatístico. Não garante prêmios ou acertos, pois os resultados das
          loterias são aleatórios.
        </Text>

        {/* SUPORTE */ /*}
        <TouchableOpacity onPress={abrirSuporte}>
          <Text
            style={{
              textAlign: "center",
              color: "#0a7ea4",
              marginTop: 10,
            }}
          >
            Suporte
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
} */

// sem ativação pró
// usado para primeira AAB NO PLAY - ABAIXO -

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppButton from "../components/AppButton";
import styles from "../styles/globalStyles";
import { verificarPlanoServidor } from "../utils/verificarPlanoServidor";

export default function Index() {
  const router = useRouter();

  const [plano, setPlano] = useState("free");
  const [carregando, setCarregando] = useState(true);

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    async function carregarPlano() {
      try {
        console.log("🔄 Carregando plano...");

        const planoServidor = await verificarPlanoServidor();

        if (planoServidor === "pro" || planoServidor === "free") {
          setPlano(planoServidor);
        } else {
          console.log("Plano inválido, usando FREE");
          setPlano("free");
        }
      } catch (error) {
        console.log("❌ Erro ao buscar plano:", error);
        setPlano("free");
      } finally {
        setTimeout(() => {
          setCarregando(false);
        }, 2000);
      }
    }
    carregarPlano();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  // ✅ FUNÇÃO AJUSTADA (SEM ATIVAÇÃO DE PRO)
  async function ativarPro() {
    Alert.alert(
      "Plano PRO",
      "O plano PRO estará disponível em breve com novos recursos exclusivos 🚀",
      [{ text: "OK" }],
    );
  }

  function abrirSuporte() {
    Linking.openURL("https://fer-fcarneiro.github.io/FFC.dev.apps/");
  }

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0a7ea4",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.Image
          source={require("../assets/splashNovo.png")}
          style={{
            width: 680,
            height: 680,
            opacity: fadeAnim,
            transform: [{ scale: fadeAnim }],
          }}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>FFC LotoTech25</Text>

        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Gerador inteligente com filtros estatísticos para jogos da Lotofácil e
          conferidor com histórico automático de jogos gerados.
        </Text>

        {/* 📊 FREE */}
        <Text style={styles.titulo}>Plano Free</Text>

        <Text>✔ Soma entre 185 até 228</Text>
        <Text>✔ Repetidos entre 7 até 11</Text>
        <Text>✔ Escolher até 17 dezenas</Text>

        {/* ⭐ PRO */}
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            ⭐ FFC LotoTech25 PRO
          </Text>

          <Text style={{ textAlign: "center" }}>✔ Escolher 6 até 9 pares</Text>
          <Text style={{ textAlign: "center" }}>✔ Gerar até 500 apostas</Text>
          <Text style={{ textAlign: "center" }}>✔ Filtros avançados</Text>
          <Text style={{ textAlign: "center" }}>✔ Escolher até 25 dezenas</Text>
          <Text style={{ textAlign: "center" }}>
            ✔ Exportar histórico em PDF
          </Text>

          {plano === "pro" && (
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <Text style={{ fontWeight: "bold", color: "green" }}>
                ⭐ Plano PRO ativo
              </Text>
              <Text
                style={{ fontWeight: "bold", color: "green", marginTop: 8 }}
              >
                Clique Iniciar rodada
              </Text>
            </View>
          )}
        </View>

        {/* 🆕 CADASTRO FREE */}
        <AppButton
          title="Criar conta FREE"
          onPress={() => router.push("/cadastro?plano=free")}
        />

        {/* 🔥 PRO (DESATIVADO TEMPORARIAMENTE) */}
        {plano === "free" && (
          <AppButton title="PRO (em breve)" onPress={ativarPro} />
        )}

        {/* 🔐 LOGIN */}
        <AppButton title="Entrar" onPress={() => router.push("/login")} />

        {/* INFO */}
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          O aplicativo utiliza padrões estatísticos de concursos anteriores para
          gerar jogos mais equilibrados.
        </Text>

        <Text
          style={{
            marginTop: 15,
            textAlign: "center",
            fontSize: 13,
            color: "#d84949",
          }}
        >
          Atenção: este aplicativo é apenas uma ferramenta de apoio matemático e
          estatístico. Não garante prêmios ou acertos, pois os resultados das
          loterias são aleatórios.
        </Text>

        {/* SUPORTE */}
        <TouchableOpacity onPress={abrirSuporte}>
          <Text
            style={{
              textAlign: "center",
              color: "#0a7ea4",
              marginTop: 10,
            }}
          >
            Suporte
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
