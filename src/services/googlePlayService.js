/*const { google } = require("googleapis")
const path = require("path")

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(
    __dirname,
    "../../credentials/ffc-lototech25-36ec8de9b20c.json"
  ),
  scopes: [
    "https://www.googleapis.com/auth/androidpublisher"
  ]
})

const androidPublisher = google.androidpublisher({
  version: "v3",
  auth
})

module.exports = {
  androidPublisher
}*/
const { google } = require("googleapis")
const path = require("path")

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(
    __dirname,
    "../../credentials/ffc-lototech25-36ec8de9b20c.json"
  ),
  scopes: [
    "https://www.googleapis.com/auth/androidpublisher"
  ]
})

const androidPublisher = google.androidpublisher({
  version: "v3",
  auth
})

// ======================================
// CONSULTAR ASSINATURA GOOGLE PLAY
// ======================================

async function consultarAssinatura(purchaseToken) {

  try {

    const resposta =
      await androidPublisher.purchases.subscriptionsv2.get({
        packageName: "com.ffc.lototech25",
        token: purchaseToken
      })

    console.log("=== RESPOSTA GOOGLE PLAY ===")
    console.log(
      JSON.stringify(resposta.data, null, 2)
    )

    return resposta.data

  } catch (error) {

    console.log("=== ERRO GOOGLE PLAY ===")

    console.log(
      error.response?.data || error.message
    )

    throw error
  }
}

module.exports = {
  androidPublisher,
  consultarAssinatura
}