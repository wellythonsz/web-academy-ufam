import express from 'express';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json()); // ESSENCIAL: Permite ler o corpo das requisições (req.body)
app.use(router);

app.listen(PORT, () => {
  console.log(`ExpAPI rodando na porta ${PORT}`);
});