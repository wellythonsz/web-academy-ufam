import { Router } from 'express';
import mainController from './controllers/main'; // Importa o controlador criado

const router = Router();

// Mapeamento das rotas utilizando as funções do controlador
router.get('/', mainController.index);
router.get('/lorem/:numero', mainController.loremIpsum);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

export default router;