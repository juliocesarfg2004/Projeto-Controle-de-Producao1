import prisma from "../config/db.js";

const createProduto = async (data) => {
    return await prisma.produto.create({
        data: {
            ...data,
            atualizado_em: new Date()
        }
    });
};

const getAllProdutos = async () => {
    return await prisma.produto.findMany({
        include: {
            tipo: true
        }
    });
};

const getProdutoById = async (id) => {
    return await prisma.produto.findUnique({
        where: { produto_id: Number(id) },
        include: {
            tipo: true
        }
    });
};

const updateProduto = async (id, data) => {
    return await prisma.produto.update({
        where: { produto_id: Number(id) },
        data: {
            ...data,
            atualizado_em: new Date()
        }
    });
};

const deleteProduto = async (id) => {
    return await prisma.produto.delete({
        where: { produto_id: Number(id) }
    });
};

export {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
};