import prisma from "../config/db.js";

const getAllUsuarios = async () => {
    return await prisma.usuario.findMany({
        select: {
            usuario_id: true,
            nome: true,
            login: true,
            atualizado_em: true
        }
    });
};

const getUsuario = async (id) => {
    return await prisma.usuario.findUnique({
        where: { usuario_id: Number(id) },
        select: {
            usuario_id: true,
            nome: true,
            login: true,
            atualizado_em: true
        }
    });
};

const getByIdEmail = async (login) => {
    const usuario = await prisma.usuario.findUnique({
        where: { login }
    });
    
    return usuario;
};

const updateUsuario = async (id, data) => {
    return await prisma.usuario.update({
        where: { usuario_id: Number(id) },
        data: {
            ...data,
            atualizado_em: new Date()
        },
        select: {
            usuario_id: true,
            nome: true,
            login: true,
            atualizado_em: true
        }
    });
};

const deleteUsuario = async (id) => {
    return await prisma.usuario.delete({
        where: { usuario_id: Number(id) }
    });
};

export {
    getAllUsuarios,
    getUsuario,
    getByIdEmail,
    updateUsuario,
    deleteUsuario
};