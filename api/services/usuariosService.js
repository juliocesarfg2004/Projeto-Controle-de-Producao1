import * as usuariosRepository from '../repositories/usuariosRepository.js';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";

dotenv.config();

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

export const getAllUsuarios = async () => {
  try {
    const usuarios = await usuariosRepository.getAllUsuarios();
    return usuarios;
  } catch (error) {
    throw error;
  }
};

export const getUsuario = async (id) => {
  const usuario = await usuariosRepository.getUsuario(id);
  
  if (!usuario) {
    const error = new Error("Usuário não encontrado");
    error.status = 404;
    throw error;
  }
  
  return usuario;
};

export const updateUsuario = async (id, nome, email, senha) => {
  const usuarioExistente = await usuariosRepository.getUsuario(id);
  
  if (!usuarioExistente) {
    const error = new Error("Usuário não encontrado");
    error.status = 404;
    throw error;
  }

  if (email !== usuarioExistente.login) {
    const usuarioMesmoEmail = await usuariosRepository.getByIdEmail(email);
    if (usuarioMesmoEmail) {
      const error = new Error("Este email já está em uso por outro usuário");
      error.status = 409;
      throw error;
    }
  }

  const updateData = {
    nome,
    login: email
  };

  if (senha && senha.trim() !== "") {
    updateData.senha = await bcrypt.hash(senha, BCRYPT_ROUNDS);
  }

  const usuarioAlterado = await usuariosRepository.updateUsuario(id, updateData);
  
  return usuarioAlterado;
};

export const deleteUsuario = async (id) => {
  const usuario = await usuariosRepository.getUsuario(id);
  
  if (!usuario) {
    const error = new Error("Usuário não encontrado");
    error.status = 404;
    throw error;
  }
  
  return await usuariosRepository.deleteUsuario(id);
};