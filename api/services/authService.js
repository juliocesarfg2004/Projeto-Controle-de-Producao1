import { getByIdEmail } from '../repositories/usuariosRepository.js';
import * as authRepository from '../repositories/authRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_aqui';

export const createUser = async (nome, email, senha) => {
  const usuarioExistente = await getByIdEmail(email);
  
  if (usuarioExistente) {
    const error = new Error("Email já cadastrado");
    error.status = 409;
    throw error;
  }

  const senhaCriptografada = await bcrypt.hash(senha, BCRYPT_ROUNDS);
  const usuarioCriado = await authRepository.createUser(nome, email, senhaCriptografada);
  
  return usuarioCriado;
};

export const loginUsuario = async (email, senha) => {
  const usuario = await getByIdEmail(email);
  
  if (!usuario) {
    const error = new Error("Login ou senha incorretos");
    error.status = 401;
    throw error;
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    const error = new Error("Login ou senha incorretos");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: usuario.usuario_id,
      email: usuario.login,
      nome: usuario.nome
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  const { senha: _, ...usuarioSemSenha } = usuario;

  return {
    token,
    user: usuarioSemSenha
  };
};