import { Request, Response, NextFunction } from 'express';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  // Verifica se o usuário tem um cookie de identificação ativo (está logado)
  // Nota: Se a sua rota de Auth/Login salvar o cookie com outro nome (ex: 'usuarioId'), ajuste aqui!
  if (req.cookies.uid) {
    next(); // Usuário logado, pode seguir!
  } else {
    res.status(401).json({ msg: 'Não autorizado. Por favor, faça login.' });
  }
};

export default isAuth;