import * as authService from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body || {};

    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        message: "Os campos nome, login e senha são obrigatórios" 
      });
    }

    const usuarioCriado = await authService.createUser(nome, email, senha);

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      usuario: usuarioCriado
    });

  } catch (error) {
    console.error("Erro no registro:", error);
    if (error.status === 409) {
      return res.status(409).json({ message: error.message });
    }
    
    return res.status(500).json({ 
      message: "Erro ao criar o usuário"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, login, senha } = req.body || {};
    const identificador = email || login;

    if (!identificador || !senha) {
      return res.status(400).json({ 
        message: "Os campos email/login e senha são obrigatórios" 
      });
    }

    console.log("Tentativa de login:", identificador);

    const response = await authService.loginUsuario(identificador, senha);

    return res.status(200).json({
      message: "Login realizado com sucesso",
      ...response
    });

  } catch (error) {
    console.error("Erro no login:", error);
    if (error.status === 401) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ 
      message: "Erro no servidor"
    });
  }
};