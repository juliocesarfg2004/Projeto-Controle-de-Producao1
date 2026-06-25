import prisma from "../config/db.js";

const createTipo = async (descricao) => {
    return await prisma.produtoTipo.create({
        data: { descricao }
    });
};

const getAllTipos = async () => {
    return await prisma.produtoTipo.findMany({
        include: {
            produtos: true
        }
    });
};

const getTipoById = async (id) => {
    return await prisma.produtoTipo.findUnique({
        where: { material_tipo_id: Number(id) },
        include: {
            produtos: true
        }
    });
};

const getTipoByDescricao = async (descricao) => {
    return await prisma.produtoTipo.findUnique({
        where: { descricao }
    });
};

const updateTipo = async (id, descricao) => {
    return await prisma.produtoTipo.update({
        where: { material_tipo_id: Number(id) },
        data: { descricao }
    });
};

const deleteTipo = async (id) => {
    return await prisma.produtoTipo.delete({
        where: { material_tipo_id: Number(id) }
    });
};

export {
    createTipo,
    getAllTipos,
    getTipoById,
    getTipoByDescricao,
    updateTipo,
    deleteTipo
};