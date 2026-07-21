import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session'; // <-- 1. Importação do express-session
import setLangCookie from './middlewares/setLangCookie';
import languageRouter from './resources/language/language.router';
import usuarioRouter from './resources/usuario/usuario.router'; 
import compraRouter from './resources/compra/compra.router'; // <-- 2. Importação da rota de compra

const app = express();

app.use(express.json());

// 1. Ativa o leitor de cookies ANTES das rotas
app.use(cookieParser());

// 2. Configuração da sessão (DEVE vir antes das rotas)
app.use(session({
  secret: process.env.SESSION_SECRET || 'meusegredo',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // secure: false porque estamos rodando em localhost sem HTTPS
}));

// 3. Aplica o middleware que define a linguagem padrão (pt-BR)
app.use(setLangCookie);

// 4. Registra as rotas para o Insomnia/Bruno acessar
app.use('/language', languageRouter);
app.use('/usuario', usuarioRouter); 
app.use('/compra', compraRouter); // <-- 3. Rota de compra plugada aqui!

// ... resto das suas rotas (ex: app.use('/product', productRouter);)

app.listen(4444, () => {
  console.log('Servidor rodando na porta 4444');
});