const service = require("../services/users.service");

// LISTAR usuários
exports.list = (req, res) => {
  const users = service.getUsers();

  res.status(200).json(users);
};

// CRIAR usuário (CADASTRO)
exports.create = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      erro: "Email e senha são obrigatórios",
    });
  }

  const user = service.createUser({
    email,
    senha,
    plano: "free",
  });

  res.status(201).json({
    sucesso: true,
    usuario: user,
  });
};
