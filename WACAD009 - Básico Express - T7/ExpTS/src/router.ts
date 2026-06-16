import { Router } from 'express';
import mainController from './controllers/main';
import productController from './controllers/product'; // <-- Importa aqui

const router = Router();

router.get('/', mainController.index);
router.get('/sobre', mainController.sobre);
router.get('/hb1', mainController.hb1);

router.get('/product', productController.index);

router.get('/product/create', productController.create);
router.post('/product/create', productController.create);

router.get('/product/update/:id', productController.update);
router.post('/product/update/:id', productController.update);

router.post('/product/delete/:id', productController.remove);

export default router;