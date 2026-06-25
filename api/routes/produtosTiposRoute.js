import express from 'express';
import * as produtosTiposController from '../controllers/produtosTiposController.js';

const router = express.Router();

/**
 * @openapi
 * /tipos-produtos:
 *   post:
 *     tags: [Tipos de Produtos]
 *     summary: Cadastrar um novo tipo de produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [descricao]
 *             properties:
 *               descricao:
 *                 type: string
 *                 description: Descrição do tipo
 *     responses:
 *       201:
 *         description: Tipo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProdutoTipo'
 *       400:
 *         description: Descrição é obrigatória
 *       409:
 *         description: Tipo já cadastrado
 */
router.post('/', produtosTiposController.createTipo);

/**
 * @openapi
 * /tipos-produtos:
 *   get:
 *     tags: [Tipos de Produtos]
 *     summary: Listar todos os tipos de produtos
 *     responses:
 *       200:
 *         description: Lista de tipos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProdutoTipo'
 */
router.get('/', produtosTiposController.getAllTipos);

/**
 * @openapi
 * /tipos-produtos/{id}:
 *   get:
 *     tags: [Tipos de Produtos]
 *     summary: Buscar tipo de produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tipo
 *     responses:
 *       200:
 *         description: Dados do tipo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProdutoTipo'
 *       404:
 *         description: Tipo não encontrado
 */
router.get('/:id', produtosTiposController.getTipoById);

/**
 * @openapi
 * /tipos-produtos/{id}:
 *   put:
 *     tags: [Tipos de Produtos]
 *     summary: Atualizar um tipo de produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [descricao]
 *             properties:
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProdutoTipo'
 *       404:
 *         description: Tipo não encontrado
 *       409:
 *         description: Já existe um tipo com esta descrição
 */
router.put('/:id', produtosTiposController.updateTipo);

/**
 * @openapi
 * /tipos-produtos/{id}:
 *   delete:
 *     tags: [Tipos de Produtos]
 *     summary: Deletar um tipo de produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tipo
 *     responses:
 *       200:
 *         description: Tipo deletado com sucesso
 *       404:
 *         description: Tipo não encontrado
 *       400:
 *         description: Não é possível excluir tipo com produtos vinculados
 */
router.delete('/:id', produtosTiposController.deleteTipo);

export default router;