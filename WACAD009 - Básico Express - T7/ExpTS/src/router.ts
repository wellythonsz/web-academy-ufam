import { Router, Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();
const lorem = new LoremIpsum();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

router.get('/lorem/:numero', (req: Request, res: Response) => {
  const numero = parseInt(req.params.numero as string);

  if (isNaN(numero) || numero <= 0) {
    res.status(400).send('Por favor, informe um número válido de parágrafos.');
    return;
  }

  const textoGerado = lorem.generateParagraphs(numero);
  res.send(`<p>${textoGerado.split('\n').join('</p><p>')}</p>`);
});


router.get('/hb1', (req: Request, res: Response) => {
  res.render('hb1', { 
    mensagem: 'Olá, Handlebars!' 
  });
});

router.get('/hb2', (req: Request, res: Response) => {
  res.render('hb2', { 
    nome: 'React', 
    isPoderoso: false 
  });
});

router.get('/hb3', (req: Request, res: Response) => {
  const profs = [
    { nome: 'David', sala: '111' },
    { nome: 'Bruno', sala: '222' },
    { nome: 'Tayana', sala: '333' }
  ];
  
  res.render('hb3', { profs });
});

// Rota HB4: Helper Customizado
router.get('/hb4', (req: Request, res: Response) => {
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
});

export default router;