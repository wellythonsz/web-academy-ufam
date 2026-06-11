import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import logger from './middlewares/logger'; // 1. Faltava importar o middleware!

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

// 2. Faltava acionar o middleware ANTES das rotas!
app.use(logger('completo'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});

app.get('/', (req: Request, res: Response) => {
  console.log("👉 CHEGOU NA ROTA PRINCIPAL!");
  res.send('Hello world!');
});