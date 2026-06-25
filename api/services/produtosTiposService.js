import * as produtoTipoRepository from '../repositories/produtosTiposRepository.js';

export const createTipo = async (descricao) => {
    try {
        const tipoExistente = await produtoTipoRepository.getTipoByDescricao(descricao);
        if (tipoExistente) {
            const error = new Error("Tipo de produto já cadastrado");
            error.status = 409;
            throw error;
        }

        const tipo = await produtoTipoRepository.createTipo(descricao);
        return tipo;
    } catch (error) {
        throw error;
    }
};

export const getAllTipos = async () => {
    try {
        const tipos = await produtoTipoRepository.getAllTipos();
        return tipos;
    } catch (error) {
        throw error;
    }
};

export const getTipoById = async (id) => {
    try {
        const tipo = await produtoTipoRepository.getTipoById(id);
        if (!tipo) {
            const error = new Error("Tipo de produto não encontrado");
            error.status = 404;
            throw error;
        }
        return tipo;
    } catch (error) {
        throw error;
    }
};

export const updateTipo = async (id, descricao) => {
    try {
        const tipoExistente = await produtoTipoRepository.getTipoById(id);
        if (!tipoExistente) {
            const error = new Error("Tipo de produto não encontrado");
            error.status = 404;
            throw error;
        }

        const tipoMesmaDescricao = await produtoTipoRepository.getTipoByDescricao(descricao);
        if (tipoMesmaDescricao && tipoMesmaDescricao.material_tipo_id !== Number(id)) {
            const error = new Error("Já existe um tipo com esta descrição");
            error.status = 409;
            throw error;
        }

        const tipo = await produtoTipoRepository.updateTipo(id, descricao);
        return tipo;
    } catch (error) {
        throw error;
    }
};

export const deleteTipo = async (id) => {
    try {
        const tipoExistente = await produtoTipoRepository.getTipoById(id);
        if (!tipoExistente) {
            const error = new Error("Tipo de produto não encontrado");
            error.status = 404;
            throw error;
        }

        if (tipoExistente.produtos?.length > 0) {
            const error = new Error("Não é possível excluir um tipo que possui produtos vinculados");
            error.status = 400;
            throw error;
        }

        await produtoTipoRepository.deleteTipo(id);
        return { message: "Tipo de produto deletado com sucesso" };
    } catch (error) {
        throw error;
    }
};