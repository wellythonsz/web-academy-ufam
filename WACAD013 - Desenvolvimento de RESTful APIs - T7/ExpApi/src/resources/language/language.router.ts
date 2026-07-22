import { Router } from 'express';
import languageController from './language.controller';

const router = Router();

// Usando POST para permitir o envio do JSON no body através do Insomnia
router.post('/change', languageController.changeLanguage);

export default router;

/**
 * @openapi
 * /language/change:
 *   get:
 *     summary: Altera o idioma da aplicação via cookie.
 *     tags: [Language]
 *     responses:
 *       200:
 *         description: Idioma alterado com sucesso.
 */
// Exemplo: router.get('/change', languageController.changeLanguage);