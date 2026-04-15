/*const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// ==========================
// LISTAR USUÁRIOS
// ==========================

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-senha");
    res.json(users);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
});

// ==========================
// CADASTRO
// ==========================

router.post("/", async (req, res) => {
  try {
    const { email, senha, plano } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha são obrigatórios",
      });
    }

    const existe = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existe) {
      return res.status(400).json({
        erro: "Email já cadastrado",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUser = new User({
      email: email.toLowerCase(),
      senha: senhaHash,
      plano: plano || "free",
    });

    await novoUser.save();

    console.log("USUÁRIO SALVO:", novoUser);

    res.status(201).json({
      id: novoUser._id,
      email: novoUser.email,
      plano: novoUser.plano,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro no cadastro" });
  }
});

// ==========================
// LOGIN
// ==========================

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha são obrigatórios",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    res.json({
      id: user._id,
      email: user.email,
      plano: user.plano,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro no login" });
  }
});

// ==========================
// BUSCAR USUÁRIO
// ==========================

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-senha");

    if (!user) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
});

// ==========================
// VERIFICAR PLANO
// ==========================

router.get("/:id/plano", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    res.json({
      id: user._id,
      plano: user.plano,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao verificar plano" });
  }
});

// ==========================
// ATUALIZAR USUÁRIO
// ==========================

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    if (req.body.email) {
      user.email = req.body.email.toLowerCase();
    }

    if (req.body.senha) {
      user.senha = await bcrypt.hash(req.body.senha, 10);
    }

    if (req.body.plano) {
      user.plano = req.body.plano;
    }

    await user.save();

    res.json({
      id: user._id,
      email: user.email,
      plano: user.plano,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
});

// ==========================
// REMOVER USUÁRIO
// ==========================

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      mensagem: "Usuário removido",
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover usuário" });
  }
});

module.exports = router;
*/

// cod atulizado no mesmo momento que acabei de atualizar o index.js.
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// 🔥 GOOGLE PLAY API
const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json", // 🔐 coloque seu arquivo aqui
  scopes: ["https://www.googleapis.com/auth/androidpublisher"],
});

const androidpublisher = google.androidpublisher({
  version: "v3",
  auth,
});

// ==========================
// LISTAR USUÁRIOS
// ==========================

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-senha");
    res.json(users);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
});

// ==========================
// CADASTRO
// ==========================

router.post("/", async (req, res) => {
  try {
    const { email, senha, plano } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha são obrigatórios",
      });
    }

    const existe = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existe) {
      return res.status(400).json({
        erro: "Email já cadastrado",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUser = new User({
      email: email.toLowerCase(),
      senha: senhaHash,
      plano: plano || "free",
    });

    await novoUser.save();

    res.status(201).json({
      id: novoUser._id,
      email: novoUser.email,
      plano: novoUser.plano,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro no cadastro" });
  }
});

// ==========================
// LOGIN
// ==========================

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha são obrigatórios",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    res.json({
      id: user._id,
      email: user.email,
      plano: user.plano,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro no login" });
  }
});

// ==========================
// BUSCAR USUÁRIO
// ==========================

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-senha");

    if (!user) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
});

// ==========================
// VERIFICAR PLANO
// ==========================

router.get("/:id/plano", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    res.json({
      id: user._id,
      plano: user.plano,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao verificar plano" });
  }
});

// ==========================
// 🔐 VALIDAR COMPRA (PLAY STORE)
// ==========================

router.post("/validar-compra", async (req, res) => {
  try {
    const { userId, purchaseToken } = req.body;

    if (!userId || !purchaseToken) {
      return res.status(400).json({
        erro: "Dados incompletos",
      });
    }

    const response = await androidpublisher.purchases.subscriptions.get({
      packageName: "com.ffc.lototech25", // 🔥 ALTERAR se necessário
      subscriptionId: "pro_anual",
      token: purchaseToken,
    });

    const compra = response.data;

    // 🔥 pagamento confirmado
    if (compra.paymentState === 1) {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          erro: "Usuário não encontrado",
        });
      }

      user.plano = "pro";
      await user.save();

      return res.json({
        sucesso: true,
        plano: "pro",
      });
    }

    return res.status(400).json({
      erro: "Pagamento não confirmado",
    });
  } catch (error) {
    console.log("❌ ERRO VALIDAÇÃO:", error);

    res.status(500).json({
      erro: "Erro ao validar compra",
    });
  }
});

// ==========================
// ATUALIZAR USUÁRIO
// ==========================

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    if (req.body.email) {
      user.email = req.body.email.toLowerCase();
    }

    if (req.body.senha) {
      user.senha = await bcrypt.hash(req.body.senha, 10);
    }

    // ⚠️ CUIDADO (mantido, mas não recomendado para produção)
    if (req.body.plano) {
      user.plano = req.body.plano;
    }

    await user.save();

    res.json({
      id: user._id,
      email: user.email,
      plano: user.plano,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
});

// ==========================
// REMOVER USUÁRIO
// ==========================

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      mensagem: "Usuário removido",
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover usuário" });
  }
});

module.exports = router;
