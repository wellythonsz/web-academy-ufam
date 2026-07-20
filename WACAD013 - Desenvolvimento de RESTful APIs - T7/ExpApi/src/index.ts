import express from 'express';
import cookieParser from 'cookie-parser';
import setLangCookie from './middlewares/setLangCookie';
import languageRouter from './resources/language/language.router';
import usuarioRouter from './resources/usuario/usuario.router'; // <-- 1. Importação adicionada aqui

const app = express();

app.use(express.json());

// 1. Ativa o leitor de cookies ANTES das rotas
app.use(cookieParser());

// 2. Aplica o middleware que define a linguagem padrão (pt-BR)
app.use(setLangCookie);

// 3. Registra as rotas para o Insomnia/Bruno acessar
app.use('/language', languageRouter);
app.use('/usuario', usuarioRouter); // <-- 2. Rota de usuário plugada aqui!

// ... resto das suas rotas (ex: app.use('/product', productRouter);)

app.listen(4444, () => {
  console.log('Servidor rodando na porta 4444');
});