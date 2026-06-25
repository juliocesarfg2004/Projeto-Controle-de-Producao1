import express from 'express';
import * as usuariosController from '../controllers/usuariosController.js';
import {authenticateToken} from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/', authenticateToken, usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

export default router;