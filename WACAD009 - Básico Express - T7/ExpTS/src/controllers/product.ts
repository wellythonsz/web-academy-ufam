import { Request, Response } from 'express';

// Interface para definir como é um Produto
interface Product {
    id: number;
    name: string;
    price: number;
}

// Nosso banco de dados em memória (inicia vazio)
let products: Product[] = [];
let nextId = 1; // Gerador de IDs automáticos

// 1. READ: Lista todos os produtos
const index = (req: Request, res: Response) => {
    res.render('product/index', { products });
};

// 2. CREATE: Mostra o formulário (GET) e salva o produto (POST)
const create = (req: Request, res: Response) => {
    if (req.method === 'GET') {
        res.render('product/create');
    } else {
        const { name, price } = req.body;
        products.push({ id: nextId++, name, price: parseFloat(price) });
        res.redirect('/product'); 
    }
};

// 3. UPDATE: Mostra o formulário preenchido (GET) e atualiza (POST)
const update = (req: Request, res: Response) => {
    // Adicionado o 'as string' para resolver o erro do TypeScript
    const id = parseInt(req.params.id as string);
    
    if (req.method === 'GET') {
        const product = products.find(p => p.id === id);
        if (!product) return res.status(404).send('Produto não encontrado');
        
        res.render('product/update', { product });
    } else {
        const { name, price } = req.body;
        
        // Trocado de 'index' para 'prodIndex' para não dar conflito de nome
        const prodIndex = products.findIndex(p => p.id === id);
        
        if (prodIndex > -1) {
            products[prodIndex] = { id, name, price: parseFloat(price) };
        }
        res.redirect('/product');
    }
};

// 4. DELETE: Remove o produto
const remove = (req: Request, res: Response) => {
    // Adicionado o 'as string' aqui também
    const id = parseInt(req.params.id as string);
    
    products = products.filter(p => p.id !== id);
    res.redirect('/product');
};

export default { index, create, update, remove };