import express from 'express';
import * as ordemProducaoController from '../controllers/ordemProducaoController.js';

const router = express.Router();

/**
 * @openapi
 * /ordem-producao:
 *   post:
 *     tags: [Ordens de Produção]
 *     summary: Criar uma nova ordem de produção
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [produto_id, data, quantidade]
 *             properties:
 *               produto_id:
 *                 type: integer
 *                 description: ID do produto
 *               data:
 *                 type: string
 *                 format: date
 *                 description: Data da ordem (YYYY-MM-DD)
 *               quantidade:
 *                 type: integer
 *                 description: Quantidade a produzir
 *               atualizado_por:
 *                 type: integer
 *                 description: ID do usuário responsável
 *     responses:
 *       201:
 *         description: Ordem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/OrdemProducao'
 *       400:
 *         description: Campos obrigatórios não informados
 *       404:
 *         description: Produto não encontrado
 */
router.post('/', ordemProducaoController.createOrdem);

/**
 * @openapi
 * /ordem-producao:
 *   get:
 *     tags: [Ordens de Produção]
 *     summary: Listar todas as ordens de produção
 *     responses:
 *       200:
 *         description: Lista de ordens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrdemProducao'
 */
router.get('/', ordemProducaoController.getAllOrdens);

/**
 * @openapi
 * /ordem-producao/{id}:
 *   get:
 *     tags: [Ordens de Produção]
 *     summary: Buscar ordem de produção por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da ordem
 *     responses:
 *       200:
 *         description: Dados da ordem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdemProducao'
 *       404:
 *         description: Ordem não encontrada
 */
router.get('/:id', ordemProducaoController.getOrdemById);

/**
 * @openapi
 * /ordem-producao/{id}:
 *   put:
 *     tags: [Ordens de Produção]
 *     summary: Atualizar uma ordem de produção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da ordem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produto_id:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *               quantidade:
 *                 type: integer
 *               progresso:
 *                 type: integer
 *                 description: Progresso em porcentagem (0-100)
 *               atualizado_por:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Ordem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/OrdemProducao'
 *       404:
 *         description: Ordem não encontrada
 */
router.put('/:id', ordemProducaoController.updateOrdem);

/**
 * @openapi
 * /ordem-producao/{id}:
 *   delete:
 *     tags: [Ordens de Produção]
 *     summary: Deletar uma ordem de produção
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da ordem
 *     responses:
 *       200:
 *         description: Ordem deletada com sucesso
 *       404:
 *         description: Ordem não encontrada
 */
router.delete('/:id', ordemProducaoController.deleteOrdem);

export default router;