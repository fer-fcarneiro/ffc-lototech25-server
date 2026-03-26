/*
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BASE_URL } from "../utils/config"

export async function verificarPlanoServidor() {
  try {
    const usuarioId = await AsyncStorage.getItem("usuarioId")

    if (!usuarioId) {
      return "free"
    }

    const url = `${BASE_URL}/users/${usuarioId}/plano`

    console.log("🔗 URL plano servidor:", url)

    const response = await fetch(url)

    if (!response.ok) {
      console.log("❌ Resposta não OK")
      return "free"
    }

    const data = await response.json()

    console.log("📦 Plano servidor:", data)

    const plano = data.plano || "free"

    await AsyncStorage.setItem("planoUsuario", plano)

    return plano
  } catch (error) {
    console.log("🚨 Erro ao verificar plano:", error)
    return "free"
  }
} */
// codigo 02

 /* import AsyncStorage from "@react-native-async-storage/async-storage"
import { BASE_URL } from "../utils/config"

export async function verificarPlanoServidor() {
  try {
    const usuarioId = await AsyncStorage.getItem("usuarioId")

    if (!usuarioId) {
      return "free"
    }

    const url = `${BASE_URL}/users/${usuarioId}/plano`

    console.log("🔗 URL plano servidor:", url)

    const response = await fetch(url)

    console.log("STATUS:", response.status)

    if (!response.ok) {
      const erro = await response.json()
      console.log("💥 ERRO REAL:", erro)
      return "free"
    }

    const data = await response.json()

    console.log("📦 Plano servidor:", data)

    const plano = data.plano || "free"

    await AsyncStorage.setItem("planoUsuario", plano)

    return plano
  } catch (error) {
    console.log("🚨 Erro ao verificar plano:", error)
    return "free"
  }
} */
// cod 03
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BASE_URL } from "../utils/config"
export async function verificarPlanoServidor() {
  try {
    const usuarioId = await AsyncStorage.getItem("usuarioId")

    console.log("🆔 ID NO STORAGE:", usuarioId) // 🔥 ADICIONA AQUI

    if (!usuarioId) {
      return "free"
    }

    const url = `${BASE_URL}/users/${usuarioId}/plano`

    console.log("🔗 URL plano servidor:", url)

    const response = await fetch(url)

    console.log("STATUS:", response.status)

    if (!response.ok) {
      const erro = await response.json()
      console.log("💥 ERRO REAL:", erro)
      return "free"
    }

    const data = await response.json()

    console.log("📦 Plano servidor:", data)

    const plano = data.plano || "free"

    await AsyncStorage.setItem("planoUsuario", plano)

    return plano
  } catch (error) {
    console.log("🚨 Erro ao verificar plano:", error)
    return "free"
  }
}