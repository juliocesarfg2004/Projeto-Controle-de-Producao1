import * as produtoRepository from '../repositories/produtosRepository.js';

export const createProduto = async (data) => {
    try {
        const produto = await produtoRepository.createProduto(data);
        return produto;
    } catch (error) {
        throw error;
    }
};

export const getAllProdutos = async () => {
    try {
        const produtos = await produtoRepository.getAllProdutos();
        return produtos;
    } catch (error) {
        throw error;
    }
};

export const getProdutoById = async (id) => {
    try {
        const produto = await produtoRepository.getProdutoById(id);
        if (!produto) {
            const error = new Error("Produto não encontrado");
            error.status = 404;
            throw error;
        }
        return produto;
    } catch (error) {
        throw error;
    }
};

export const updateProduto = async (id, data) => {
    try {
        const produtoExistente = await produtoRepository.getProdutoById(id);
        if (!produtoExistente) {
            const error = new Error("Produto não encontrado");
            error.status = 404;
            throw error;
        }

        const produto = await produtoRepository.updateProduto(id, data);
        return produto;
    } catch (error) {
        throw error;
    }
};

export const deleteProduto = async (id) => {
    try {
        const produtoExistente = await produtoRepository.getProdutoById(id);
        if (!produtoExistente) {
            const error = new Error("Produto não encontrado");
            error.status = 404;
            throw error;
        }

        await produtoRepository.deleteProduto(id);
        return { message: "Produto deletado com sucesso" };
    } catch (error) {
        throw error;
    }
};