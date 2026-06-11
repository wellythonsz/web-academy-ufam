import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import logger from './middlewares/logger';
import router from './router';
import { engine } from 'express-handlebars'; // Importa o Handlebars
import path from 'path'; // Importa o módulo nativo path do Node

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

// --- CONFIGURAÇÃO DO HANDLEBARS ---
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'src', 'views'));
console.log("🔥 O MOTOR DO HANDLEBARS FOI CONFIGURADO!"); // <-- Adicione esta linha
// ----------------------------------

app.use(logger('completo'));

// A linha mágica que injeta as rotas
app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});