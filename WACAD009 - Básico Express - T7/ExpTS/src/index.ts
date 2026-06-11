import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import logger from './middlewares/logger';
import router from './router';
import { engine } from 'express-handlebars';
import path from 'path';
import sass from 'node-sass-middleware'; // 1. Importa o SASS

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 4444; 

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'src', 'views'));

app.use(logger('completo'));

// --- 2. CONFIGURAÇÃO DO SASS E ARQUIVOS ESTÁTICOS ---
app.use(sass({
  src: path.join(process.cwd(), 'public', 'scss'),
  dest: path.join(process.cwd(), 'public', 'css'),
  outputStyle: 'compressed',
  prefix: '/css'
}));

// 3. Libera a pasta 'public' para o navegador acessar o CSS
app.use('/css', express.static(path.join(process.cwd(), 'public', 'css')));
// ---------------------------------------------------

app.use(router); // O router continua aqui embaixo

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});