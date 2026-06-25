import express from 'express';
import * as produtosController from '../controllers/produtosController.js';

const router = express.Router();

router.post('/', produtosController.createProduto);
router.get('/', produtosController.getAllProdutos);
router.get('/:id', produtosController.getProdutoById);
router.put('/:id', produtosController.updateProduto);
router.delete('/:id', produtosController.deleteProduto);

export default router;