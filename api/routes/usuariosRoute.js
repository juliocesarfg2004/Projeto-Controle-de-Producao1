import express from 'express';
import * as usuariosController from '../controllers/usuariosController.js';
import {authenticateToken} from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Listar todos os usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Token não fornecido
 */
router.post('/', usuariosController.createUsuario);
router.get('/', authenticateToken, usuariosController.getAllUsuarios);

/**
 * @openapi
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Buscar usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', usuariosController.getUsuario);

/**
 * @openapi
 * /usuarios/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Atualizar um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               login:
 *                 type: string
 *                 description: Email de login
 *               senha:
 *                 type: string
 *                 description: Nova senha (opcional)
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       409:
 *         description: Email já está em uso
 */
router.put('/:id', usuariosController.updateUsuario);

/**
 * @openapi
 * /usuarios/{id}:
 *   delete:
 *     tags: [Usuários]
 *     summary: Deletar um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', usuariosController.deleteUsuario);

export default router;