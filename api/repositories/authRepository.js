import prisma from '../config/db.js'

export const createUser = async (nome, email, senha) => {
  console.log("=== REPOSITORY CREATE USER ===");
  console.log("Dados para criar:", { nome, email });
  
  try {
    const usuario = await prisma.usuario.create({
      data: { 
        nome, 
        login: email, 
        senha,
        atualizado_em: new Date()
      },
      select: {
        usuario_id: true,
        nome: true,
        login: true,
        tipo: true,
        atualizado_em: true
      }
    });
    
    console.log("Usuário criado no banco com ID:", usuario.usuario_id);
    return usuario;
    
  } catch (error) {
    console.log("ERRO no repository:", error);
    throw error;
  }
};