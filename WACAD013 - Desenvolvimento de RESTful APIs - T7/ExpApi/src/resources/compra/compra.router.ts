import { Router } from 'express';
import compraController from './compra.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

// Apenas usuários logados podem interagir com compras
router.post('/carrinho', isAuth, compraController.adicionarAoCarrinho);
router.post('/concluir', isAuth, compraController.concluirCompra);

export default router;