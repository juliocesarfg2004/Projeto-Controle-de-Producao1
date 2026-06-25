import express from 'express';
import * as produtosTiposController from '../controllers/produtosTiposController.js';

const router = express.Router();

router.post('/', produtosTiposController.createTipo);
router.get('/', produtosTiposController.getAllTipos); 
router.get('/:id', produtosTiposController.getTipoById);
router.put('/:id', produtosTiposController.updateTipo);
router.delete('/:id', produtosTiposController.deleteTipo);

export default router;