import { Router } from 'express';
import usuarioController from './usuario.controller';
import isAuth from '../../middlewares/isAuth';
import isAdmin from '../../middlewares/isAdmin';

const router = Router();

/**
 * @openapi
 * /usuario:
 *   get:
 *     summary: Lista todos os usuários cadastrados.
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 */
router.get('/', usuarioController.index);

/**
 * @openapi
 * /usuario:
 *   post:
 *     summary: Cria um novo usuário.
 *     tags: [Usuario]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 */
router.post('/', usuarioController.create);

/**
 * @openapi
 * /usuario/{id}:
 *   get:
 *     summary: Busca um usuário específico pelo ID.
 *     tags: [Usuario]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
 *       401:
 *         description: Acesso negado. Usuário não autenticado.
 *       404:
 *         description: Usuário não encontrado.
 */
router.get('/:id', isAuth, usuarioController.read);

/**
 * @openapi
 * /usuario/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário pelo ID.
 *     tags: [Usuario]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       401:
 *         description: Acesso negado. Usuário não autenticado.
 *       403:
 *         description: Acesso negado. Usuário não é administrador.
 *       404:
 *         description: Usuário não encontrado.
 */
router.put('/:id', isAuth, isAdmin, usuarioController.update);

/**
 * @openapi
 * /usuario/{id}:
 *   delete:
 *     summary: Remove um usuário do sistema pelo ID.
 *     tags: [Usuario]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso.
 *       401:
 *         description: Acesso negado. Usuário não autenticado.
 *       403:
 *         description: Acesso negado. Usuário não é administrador.
 *       404:
 *         description: Usuário não encontrado.
 */
router.delete('/:id', isAuth, isAdmin, usuarioController.remove);

export default router;