import { Router } from 'express';
import compraController from './compra.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

// Apenas usuários logados podem interagir com compras
router.post('/carrinho', isAuth, compraController.adicionarAoCarrinho);
router.post('/concluir', isAuth, compraController.concluirCompra);

export default router;
/**
 * @openapi
 * /compra:
 *   post:
 *     summary: Finaliza a compra salvando os itens do carrinho.
 *     tags: [Compra]
 *     responses:
 *       201:
 *         description: Compra realizada com sucesso.
 *       400:
 *         description: Erro na validação dos dados da compra.
 */
// Exemplo: router.post('/', isAuth, compraController.create);