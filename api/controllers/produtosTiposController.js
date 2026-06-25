import * as produtoTipoService from '../services/produtosTiposService.js';

const createTipo = async (req, res) => {
    try {
        const { descricao } = req.body;

        if (!descricao) {
            return res.status(400).json({ message: "Descrição é obrigatória" });
        }

        const tipo = await produtoTipoService.createTipo(descricao);
        res.status(201).json(tipo);
    } catch (error) {
        if (error.status === 409) {
            res.status(409).json({ message: error.message });
        } else {
            console.error("Erro ao criar tipo:", error);
            res.status(500).json({ message: "Erro ao criar tipo de produto." });
        }
    }
};

const getAllTipos = async (req, res) => {
    try {
        const tipos = await produtoTipoService.getAllTipos();
        res.status(200).json(tipos);
    } catch (error) {
        console.error("Erro ao listar tipos:", error);
        res.status(500).json({ message: "Erro ao listar tipos de produto." });
    }
};

const getTipoById = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await produtoTipoService.getTipoById(id);
        res.status(200).json(tipo);
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Erro ao buscar tipo:", error);
            res.status(500).json({ message: "Erro ao buscar tipo de produto." });
        }
    }
};

const updateTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao } = req.body;

        if (!descricao) {
            return res.status(400).json({ message: "Descrição é obrigatória" });
        }

        const tipo = await produtoTipoService.updateTipo(id, descricao);
        res.status(200).json(tipo);
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else if (error.status === 409) {
            res.status(409).json({ message: error.message });
        } else {
            console.error("Erro ao atualizar tipo:", error);
            res.status(500).json({ message: "Erro ao atualizar tipo de produto." });
        }
    }
};

const deleteTipo = async (req, res) => {
    try {
        const { id } = req.params;
        await produtoTipoService.deleteTipo(id);
        res.status(200).json({ message: "Tipo de produto deletado com sucesso" });
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else if (error.status === 400) {
            res.status(400).json({ message: error.message });
        } else {
            console.error("Erro ao deletar tipo:", error);
            res.status(500).json({ message: "Erro ao deletar tipo de produto." });
        }
    }
};

export {
    createTipo,
    getAllTipos,
    getTipoById,
    updateTipo,
    deleteTipo
};