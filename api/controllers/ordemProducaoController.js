import * as ordemProducaoService from '../services/ordemProducaoService.js';

const createOrdem = async (req, res) => {
    try {
        const { produto_id, data, quantidade, atualizado_por } = req.body;

        if (!produto_id || !data || !quantidade) {
            return res.status(400).json({ 
                message: "Os campos produto_id, data e quantidade são obrigatórios" 
            });
        }

        const ordem = await ordemProducaoService.createOrdem({
            produto_id: Number(produto_id),
            data,
            quantidade: Number(quantidade),
            atualizado_por: atualizado_por ? Number(atualizado_por) : null
        });

        res.status(201).json({
            message: "Ordem de produção criada com sucesso.",
            data: ordem
        });
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Erro ao criar ordem:", error);
            res.status(500).json({ message: "Erro ao criar ordem de produção." });
        }
    }
};

const getAllOrdens = async (req, res) => {
    try {
        const ordens = await ordemProducaoService.getAllOrdens();
        res.status(200).json(ordens);
    } catch (error) {
        console.error("Erro ao listar ordens:", error);
        res.status(500).json({ message: "Erro ao listar ordens de produção." });
    }
};

const getOrdemById = async (req, res) => {
    try {
        const { id } = req.params;
        const ordem = await ordemProducaoService.getOrdemById(id);
        res.status(200).json(ordem);
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Erro ao buscar ordem:", error);
            res.status(500).json({ message: "Erro ao buscar ordem de produção." });
        }
    }
};

const updateOrdem = async (req, res) => {
    try {
        const { id } = req.params;
        const { produto_id, data, quantidade, progresso, atualizado_por } = req.body;

        const ordem = await ordemProducaoService.updateOrdem(id, {
            produto_id: produto_id ? Number(produto_id) : undefined,
            data,
            quantidade: quantidade ? Number(quantidade) : undefined,
            progresso: progresso ? Number(progresso) : undefined,
            atualizado_por: atualizado_por ? Number(atualizado_por) : null
        });

        res.status(200).json({
            message: "Ordem de produção atualizada com sucesso.",
            data: ordem
        });
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Erro ao atualizar ordem:", error);
            res.status(500).json({ message: "Erro ao atualizar ordem de produção." });
        }
    }
};

const deleteOrdem = async (req, res) => {
    try {
        const { id } = req.params;
        await ordemProducaoService.deleteOrdem(id);
        res.status(200).json({ 
            message: "Ordem de produção excluída com sucesso." 
        });
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Erro ao deletar ordem:", error);
            res.status(500).json({ message: "Erro ao deletar ordem de produção." });
        }
    }
};

export {
    createOrdem,
    getAllOrdens,
    getOrdemById,
    updateOrdem,
    deleteOrdem
};