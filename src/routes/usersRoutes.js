const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")

const {
  consultarAssinatura
} = require("../services/googlePlayService")

// ==========================
// LISTAR USUÁRIOS
// ==========================

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-senha")

    res.json(users)

  } catch (error) {

    res.status(500).json({
      erro: "Erro ao listar usuários"
    })
  }
})

// ==========================
// CADASTRO
// ==========================

router.post("/", async (req, res) => {
  try {

    const { email, senha, plano } = req.body

    if (!email || !senha) {

      return res.status(400).json({
        erro: "Email e senha são obrigatórios"
      })
    }

    const existe = await User.findOne({
      email: email.toLowerCase()
    })

    if (existe) {

      return res.status(400).json({
        erro: "Email já cadastrado"
      })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUser = new User({
      email: email.toLowerCase(),
      senha: senhaHash,
      plano: plano || "free"
    })

    await novoUser.save()

    console.log("USUÁRIO SALVO:", novoUser)

    res.status(201).json({
      id: novoUser._id,
      email: novoUser.email,
      plano: novoUser.plano
    })

  } catch (error) {

    res.status(500).json({
      erro: "Erro no cadastro"
    })
  }
})

// ==========================
// LOGIN
// ==========================

router.post("/login", async (req, res) => {
  try {

    const { email, senha } = req.body

    if (!email || !senha) {

      return res.status(400).json({
        erro: "Email e senha são obrigatórios"
      })
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    })

    if (!user) {

      return res.status(401).json({
        erro: "Email ou senha inválidos"
      })
    }

    const senhaValida = await bcrypt.compare(
      senha,
      user.senha
    )

    if (!senhaValida) {

      return res.status(401).json({
        erro: "Email ou senha inválidos"
      })
    }

    res.json({
      id: user._id,
      email: user.email,
      plano: user.plano
    })

  } catch (error) {

    res.status(500).json({
      erro: "Erro no login"
    })
  }
})

// ==========================
// BUSCAR USUÁRIO
// ==========================

router.get("/:id", async (req, res) => {
  try {

    const user = await User.findById(
      req.params.id
    ).select("-senha")

    if (!user) {

      return res.status(404).json({
        erro: "Usuário não encontrado"
      })
    }

    res.json(user)

  } catch (error) {

    res.status(500).json({
      erro: "Erro ao buscar usuário"
    })
  }
})

// ==========================
// VERIFICAR PLANO
// ==========================

router.get("/:id/plano", async (req, res) => {
  try {

    const user = await User.findById(
      req.params.id
    )

    if (!user) {

      return res.status(404).json({
        erro: "Usuário não encontrado"
      })
    }

    res.json({
      id: user._id,
      plano: user.plano
    })

  } catch (error) {

    res.status(500).json({
      erro: "Erro ao verificar plano"
    })
  }
})

// ==========================
// VALIDAR ASSINATURA GOOGLE PLAY
// ==========================

router.post("/:id/assinatura/google-play", async (req, res) => {

  try {

    const { purchaseToken } = req.body

    if (!purchaseToken) {

      return res.status(400).json({
        erro: "purchaseToken é obrigatório"
      })
    }

    const user = await User.findById(
      req.params.id
    )

    if (!user) {

      return res.status(404).json({
        erro: "Usuário não encontrado"
      })
    }

    console.log(
      "=== VALIDANDO ASSINATURA GOOGLE PLAY ==="
    )

    console.log(
      "Usuário:",
      user._id
    )

    console.log(
      "Produto: pro_anual"
    )

    const assinatura =
      await consultarAssinatura(purchaseToken)

    console.log(
      "Assinatura recebida:",
      JSON.stringify(
        assinatura,
        null,
        2
      )
    )

    const estado =
      assinatura?.subscriptionState

    console.log(
      "Estado da assinatura:",
      estado
    )

    if (
      estado ===
      "SUBSCRIPTION_STATE_ACTIVE"
    ) {

      user.plano = "pro"

      await user.save()

      console.log(
        "PLANO PRO ATIVADO:",
        user._id
      )

      return res.json({
        sucesso: true,
        plano: "pro",
        estado: estado
      })
    }

    return res.status(400).json({
      sucesso: false,
      plano: user.plano,
      estado: estado,
      erro: "Assinatura não está ativa"
    })

  } catch (error) {

    console.log(
      "=== ERRO AO VALIDAR ASSINATURA ==="
    )

    console.log(
      error.response?.data ||
      error.message
    )

    return res.status(500).json({
      erro: "Erro ao validar assinatura Google Play"
    })
  }
})

// ==========================
// ATUALIZAR USUÁRIO
// ==========================

router.put("/:id", async (req, res) => {
  try {

    const user = await User.findById(
      req.params.id
    )

    if (!user) {

      return res.status(404).json({
        erro: "Usuário não encontrado"
      })
    }

    if (req.body.email) {

      user.email =
        req.body.email.toLowerCase()
    }

    if (req.body.senha) {

      user.senha =
        await bcrypt.hash(
          req.body.senha,
          10
        )
    }

    if (req.body.plano) {

      user.plano =
        req.body.plano
    }

    await user.save()

    res.json({
      id: user._id,
      email: user.email,
      plano: user.plano
    })

  } catch (error) {

    res.status(500).json({
      erro: "Erro ao atualizar usuário"
    })
  }
})

// ==========================
// REMOVER USUÁRIO
// ==========================

router.delete("/:id", async (req, res) => {
  try {

    await User.findByIdAndDelete(
      req.params.id
    )

    res.json({
      mensagem: "Usuário removido"
    })

  } catch (error) {

    res.status(500).json({
      erro: "Erro ao remover usuário"
    })
  }
})

module.exports = router