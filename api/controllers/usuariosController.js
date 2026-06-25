import * as usuariosService from '../services/usuariosService.js';
import * as authService from '../services/authService.js';

export const createUsuario = async (req, res) => {
  try {
    const { nome, login, senha } = req.body || {};

    if (!nome || !login || !senha) {
      const email = login || req.body?.email;
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
    }

    const usuarioCriado = await authService.createUser(nome, login, senha);
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      usuario: usuarioCriado
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    if (error.status === 409) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: "Erro ao criar o usuário" });
  }
};

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosService.getAllUsuarios();
    
    res.status(200).json({
      message: "Usuários encontrados com sucesso",
      items: usuarios
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuariosService.getUsuario(id);
    res.status(200).json(usuario);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, login, senha } = req.body || {};
    
    const usuario = await usuariosService.updateUsuario(id, nome, login, senha);
    
    res.status(200).json({
      message: "Usuário atualizado com sucesso",
      usuario
    });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await usuariosService.deleteUsuario(id);
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  }
};