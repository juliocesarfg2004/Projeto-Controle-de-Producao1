import prisma from "../config/db.js";

const createOrdem = async (data) => {
    return await prisma.ordemProducao.create({
        data: {
            ...data,
            data: new Date(data.data),
            progresso: 0,
            atualizado_em: new Date()
        }
    });
};

const getAllOrdens = async () => {
    return await prisma.ordemProducao.findMany({
        include: {
            produto: true
        },
        orderBy: { ordem_producao_id: "desc" }
    });
};

const getOrdemById = async (id) => {
    return await prisma.ordemProducao.findUnique({
        where: { ordem_producao_id: Number(id) },
        include: {
            produto: true
        }
    });
};

const updateOrdem = async (id, data) => {
    const camposParaAtualizar = {
        ...data,
        atualizado_em: new Date()
    };

    if (data.data) {
        camposParaAtualizar.data = new Date(data.data);
    }

    return await prisma.ordemProducao.update({
        where: { ordem_producao_id: Number(id) },
        data: camposParaAtualizar
    });
};

const deleteOrdem = async (id) => {
    return await prisma.ordemProducao.delete({
        where: { ordem_producao_id: Number(id) }
    });
};

const verificarProdutoExiste = async (produto_id) => {
    return await prisma.produto.findUnique({
        where: { produto_id: Number(produto_id) }
    });
};

export {
    createOrdem,
    getAllOrdens,
    getOrdemById,
    updateOrdem,
    deleteOrdem,
    verificarProdutoExiste
};