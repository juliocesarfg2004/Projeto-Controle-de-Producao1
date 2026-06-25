import express from 'express';
import * as produtosController from '../controllers/produtosController.js';

const router = express.Router();

/**
 * @openapi
 * /produtos:
 *   post:
 *     tags: [Produtos]
 *     summary: Cadastrar um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [descricao, produto_tipo_id]
 *             properties:
 *               descricao:
 *                 type: string
 *                 description: Nome do produto
 *               produto_tipo_id:
 *                 type: integer
 *                 description: ID do tipo de produto
 *               estoque:
 *                 type: integer
 *                 description: Quantidade em estoque (padrão 0)
 *               atualizado_por:
 *                 type: integer
 *                 description: ID do usuário responsável
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Campos obrigatórios não informados
 */
router.post('/', produtosController.createProduto);

/**
 * @openapi
 * /produtos:
 *   get:
 *     tags: [Produtos]
 *     summary: Listar todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/', produtosController.getAllProdutos);

/**
 * @openapi
 * /produtos/{id}:
 *   get:
 *     tags: [Produtos]
 *     summary: Buscar produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Dados do produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', produtosController.getProdutoById);

/**
 * @openapi
 * /produtos/{id}:
 *   put:
 *     tags: [Produtos]
 *     summary: Atualizar um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               produto_tipo_id:
 *                 type: integer
 *               estoque:
 *                 type: integer
 *               atualizado_por:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', produtosController.updateProduto);

/**
 * @openapi
 * /produtos/{id}:
 *   delete:
 *     tags: [Produtos]
 *     summary: Deletar um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', produtosController.deleteProduto);

export default router;