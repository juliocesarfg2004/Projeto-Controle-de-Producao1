import express from 'express';
import * as ordemProducaoController from '../controllers/ordemProducaoController.js';

const router = express.Router();

router.post('/', ordemProducaoController.createOrdem);
router.get('/', ordemProducaoController.getAllOrdens);
router.get('/:id', ordemProducaoController.getOrdemById);
router.put('/:id', ordemProducaoController.updateOrdem);
router.delete('/:id', ordemProducaoController.deleteOrdem);

export default router;