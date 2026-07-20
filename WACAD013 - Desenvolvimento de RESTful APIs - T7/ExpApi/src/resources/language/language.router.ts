import { Router } from 'express';
import languageController from './language.controller';

const router = Router();

// Usando POST para permitir o envio do JSON no body através do Insomnia
router.post('/change', languageController.changeLanguage);

export default router;