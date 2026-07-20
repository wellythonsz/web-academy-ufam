import { Request, Response } from 'express';
import { getAllUsuarios, createUsuario, findUsuarioById, updateUsuario, deleteUsuario } from './usuario.service';
import { UserTypes } from '../userType/userType.constants';

const index = async (req: Request, res: Response) => {
  try {
    const usuarios = await getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const usuario = req.body;
  try {
    // Ajustado para 'tipoUsuarioId'
    if(!usuario.tipoUsuarioId) {
        usuario.tipoUsuarioId = UserTypes.CLIENT;
    }

    const newUsuario = await createUsuario(usuario);
    res.status(201).json(newUsuario);
  } catch (err) {
    res.status(500).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Adicionado 'as string' para acalmar o TypeScript
    const usuario = await findUsuarioById(id as string);
    if (!usuario) return res.status(404).json({ msg: 'Usuário não encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = req.body;
  try {
    // Adicionado 'as string' aqui também
    const updatedUsuario = await updateUsuario(id as string, usuario);
    res.status(200).json(updatedUsuario);
  } catch (err) {
    res.status(500).json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // E aqui também
    await deleteUsuario(id as string);
    res.status(200).json({ msg: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { index, create, read, update, remove };