// node2.js
import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
import { createLink } from './util.js';

// Carrega as variáveis de ambiente baseadas na flag do package.json
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const diretorioBase = process.argv[2];

if (!diretorioBase) {
    console.error("Erro: Você precisa informar um diretório como parâmetro.");
    process.exit(1);
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    if (req.url === '/') {
        fs.readdir(diretorioBase, (err, arquivos) => {
            if (err) {
                res.end(`Erro ao ler o diretório!`);
                return;
            }

            let html = '';
            arquivos.forEach(item => {
                html += createLink(item);
            });

            res.end(html);
        });
    } else {
        const nomeArquivo = decodeURI(req.url.substring(1));
        const caminhoCompleto = `${diretorioBase}/${nomeArquivo}`;

        fs.readFile(caminhoCompleto, 'utf8', (err, conteudo) => {
            if (err) {
                res.end(`<a href="/">Voltar</a><br><br>Não foi possível ler o arquivo.`);
                return;
            }

            res.end(`
                <a href="/">Voltar</a>
                <hr>
                <pre>${conteudo}</pre>
            `);
        });
    }
});

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} com ES Modules!`);
});