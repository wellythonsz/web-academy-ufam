import { Request, Response } from 'express';
import { salvarCompraBanco } from './compra.service';

const adicionarAoCarrinho = (req: Request, res: Response) => {
  const { produtoId, quantidade } = req.body;

  // Usando 'any' para simplificar a injeção da propriedade na sessão
  const session = req.session as any;
  
  if (!session.carrinho) {
    session.carrinho = [];
  }

  // Verifica se o produto já está no carrinho para somar a quantidade
  const itemIndex = session.carrinho.findIndex((item: any) => item.produtoId === produtoId);
  
  if (itemIndex > -1) {
    session.carrinho[itemIndex].quantidade += quantidade;
  } else {
    session.carrinho.push({ produtoId, quantidade });
  }

  res.status(200).json({ 
    msg: 'Produto adicionado ao carrinho', 
    carrinho: session.carrinho 
  });
};

const concluirCompra = async (req: Request, res: Response) => {
  const session = req.session as any;
  const carrinho = session.carrinho;
  const usuarioId = req.cookies.uid; // Pega o ID do usuário através do cookie do Lab 3

  if (!carrinho || carrinho.length === 0) {
    return res.status(400).json({ msg: 'O carrinho está vazio' });
  }

  try {
    const compra = await salvarCompraBanco(usuarioId, carrinho);
    
    // Limpa o carrinho da sessão após finalizar a compra
    session.carrinho = []; 
    
    res.status(201).json({ msg: 'Compra concluída com sucesso', compra });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { adicionarAoCarrinho, concluirCompra };