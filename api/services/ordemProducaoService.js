import * as ordemProducaoRepository from '../repositories/ordemProducaoRepository.js';

export const createOrdem = async (data) => {
    try {
        const produtoExiste = await ordemProducaoRepository.verificarProdutoExiste(data.produto_id);
        if (!produtoExiste) {
            const error = new Error("Produto não encontrado");
            error.status = 404;
            throw error;
        }

        const ordem = await ordemProducaoRepository.createOrdem(data);
        return ordem;
    } catch (error) {
        throw error;
    }
};

export const getAllOrdens = async () => {
    try {
        const ordens = await ordemProducaoRepository.getAllOrdens();
        return ordens;
    } catch (error) {
        throw error;
    }
};

export const getOrdemById = async (id) => {
    try {
        const ordem = await ordemProducaoRepository.getOrdemById(id);
        if (!ordem) {
            const error = new Error("Ordem de produção não encontrada");
            error.status = 404;
            throw error;
        }
        return ordem;
    } catch (error) {
        throw error;
    }
};

export const updateOrdem = async (id, data) => {
    try {
        const ordemExistente = await ordemProducaoRepository.getOrdemById(id);
        if (!ordemExistente) {
            const error = new Error("Ordem de produção não encontrada");
            error.status = 404;
            throw error;
        }

        if (data.produto_id) {
            const produtoExiste = await ordemProducaoRepository.verificarProdutoExiste(data.produto_id);
            if (!produtoExiste) {
                const error = new Error("Produto não encontrado");
                error.status = 404;
                throw error;
            }
        }

        const ordem = await ordemProducaoRepository.updateOrdem(id, data);
        return ordem;
    } catch (error) {
        throw error;
    }
};

export const deleteOrdem = async (id) => {
    try {
        const ordemExistente = await ordemProducaoRepository.getOrdemById(id);
        if (!ordemExistente) {
            const error = new Error("Ordem de produção não encontrada");
            error.status = 404;
            throw error;
        }

        await ordemProducaoRepository.deleteOrdem(id);
        return { message: "Ordem de produção deletada com sucesso" };
    } catch (error) {
        throw error;
    }
};