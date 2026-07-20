import { Request, Response, NextFunction } from 'express';
import { UserTypes } from '../resources/userType/userType.constants';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Verifica se o cookie com o tipo do usuário corresponde à constante ADMIN
  if (req.cookies.tipoUsuarioId === UserTypes.ADMIN) {
    next(); // É admin, permissão concedida!
  } else {
    res.status(403).json({ msg: 'Acesso negado. Esta ação requer privilégios de administrador.' });
  }
};

export default isAdmin;