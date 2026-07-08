import { Router } from 'express';
import productController from './product.controller';
import { validate } from '../../middlewares/validate';
import { productSchema } from './product.schema';

const router = Router();

router.get('/', productController.index);
router.post('/', validate(productSchema), productController.create); // <-- Validação aqui
router.get('/:id', productController.read);
router.put('/:id', validate(productSchema), productController.update); // <-- E aqui
router.delete('/:id', productController.remove);

export default router;