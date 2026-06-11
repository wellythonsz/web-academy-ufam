import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

// Lógica da rota '/'
const index = (req: Request, res: Response) => {
  res.send('Hello world!');
};

// Lógica da rota '/lorem/:numero'
const loremIpsum = (req: Request, res: Response) => {
  const numero = parseInt(req.params.numero as string);

  if (isNaN(numero) || numero <= 0) {
    res.status(400).send('Por favor, informe um número válido de parágrafos.');
    return;
  }

  const textoGerado = lorem.generateParagraphs(numero);
  res.send(`<p>${textoGerado.split('\n').join('</p><p>')}</p>`);
};

// Lógica da rota '/hb1'
const hb1 = (req: Request, res: Response) => {
  res.render('hb1', { 
    mensagem: 'Olá, Handlebars!' 
  });
};

// Lógica da rota '/hb2'
const hb2 = (req: Request, res: Response) => {
  res.render('hb2', { 
    nome: 'React', 
    isPoderoso: false 
  });
};

// Lógica da rota '/hb3'
const hb3 = (req: Request, res: Response) => {
  const profs = [
    { nome: 'David', sala: '111' },
    { nome: 'Bruno', sala: '222' },
    { nome: 'Tayana', sala: '333' }
  ];
  
  res.render('hb3', { profs });
};

// Lógica da rota '/hb4'
const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];

  res.render('hb4', { technologies });
};

// Exporta todos os métodos do controlador principal
export default { index, loremIpsum, hb1, hb2, hb3, hb4 };