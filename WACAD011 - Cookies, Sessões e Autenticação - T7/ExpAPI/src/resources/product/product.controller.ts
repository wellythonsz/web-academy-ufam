import { Request, Response } from 'express';
import {
  getAllProducts, createProduct, getProduct, updateProduct, removeProduct, checkNameInUse
} from './product.service';

async function index(req: Request, res: Response) {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function create(req: Request, res: Response) {
  const product = req.body;
  try {
    if (await checkNameInUse(product.name)) {
      return res.status(400).json({ msg: 'Produto já existe' });
    }
    const newProduct = await createProduct(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function read(req: Request, res: Response) {
  const id = req.params.id as string; // <-- Correção do TypeScript aqui
  try {
    const product = await getProduct(id);
    if (!product) return res.status(404).json({ msg: 'Produto não encontrado' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function update(req: Request, res: Response) {
  const id = req.params.id as string; // <-- Correção do TypeScript aqui
  const product = req.body;
  try {
    const updatedProduct = await updateProduct(id, product);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function remove(req: Request, res: Response) {
  const id = req.params.id as string; // <-- Correção do TypeScript aqui
  try {
    await removeProduct(id);
    res.status(200).json({ msg: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).json(err);
  }
}

export default { index, create, read, update, remove };