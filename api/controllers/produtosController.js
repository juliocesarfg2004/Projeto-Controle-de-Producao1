import * as produtoService from '../services/produtosService.js';

const createProduto = async (req, res) => {
    try {
        const { descricao, produto_tipo_id, estoque, atualizado_por } = req.body;

        if (!descricao || !produto_tipo_id) {
            return res.status(400).json({ message: "Descrição e tipo do produto são obrigatórios" });
        }

        const produto = await produtoService.createProduto({
            descricao,
            produto_tipo_id: Number(produto_tipo_id),
            estoque: estoque ? Number(estoque) : 0,
            atualizado_por: atualizado_por ? Number(atualizado_por) : null
        });

        res.status(201).json(produto);
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ message: "Erro ao criar produto." });
    }
};

const getAllProdutos = async (_req, res) => {
    try {
        const produtos = await produtoService.getAllProdutos();
        res.status(200).json(produtos);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        res.status(500).json({ message: "Erro ao listar produtos." });
    }
};

const getProdutoById = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await produtoService.getProdutoById(id);
        res.status(200).json(produto);
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Erro ao buscar produto:", error);
            res.status(500).json({ message: "Erro ao buscar produto." });
        }
    }
};

const updateProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, produto_tipo_id, estoque, atualizado_por } = req.body;

        const produto = await produtoService.updateProduto(id, {
            descricao,
            produto_tipo_id: produto_tipo_id ? Number(produto_tipo_id) : undefined,
            estoque: estoque ? Number(estoque) : undefined,
            atualizado_por: atualizado_por ? Number(atualizado_por) : null
        });

        res.status(200).json(produto);
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Erro ao atualizar produto:", error);
            res.status(500).json({ message: "Erro ao atualizar produto." });
        }
    }
};

const deleteProduto = async (req, res) => {
    try {
        const { id } = req.params;
        await produtoService.deleteProduto(id);
        res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        } else {
            console.error("Erro ao deletar produto:", error);
            res.status(500).json({ message: "Erro ao deletar produto." });
        }
    }
};

export {
    createProduto,
    getAllProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
};