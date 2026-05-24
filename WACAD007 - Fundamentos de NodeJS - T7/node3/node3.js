import http from 'http';
import fs from 'fs/promises'; // Importando a versão com Promises do FS
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Um parágrafo padrão para repetirmos
const paragrafoLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const server = http.createServer(async (req, res) => {
    // Separa a rota dos parâmetros (útil para a nossa API)
    const urlBase = req.url.split('?')[0];

    try {
        // ROTEAMENTO DE FICHEIROS ESTÁTICOS COM FS.PROMISES
        if (urlBase === '/') {
            // Lê o HTML e envia
            const html = await fs.readFile('./public/index.html', 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        } 
        else if (urlBase === '/style.css') {
            // Lê o CSS e envia
            const css = await fs.readFile('./public/style.css', 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(css);
        } 
        else if (urlBase === '/script.js') {
            // Lê o JS e envia
            const js = await fs.readFile('./public/script.js', 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(js);
        }
        
        // ROTA DA API PARA GERAR O LOREM IPSUM
        else if (urlBase === '/api/lorem') {
            // Captura o número digitado pelo utilizador na URL
            const urlParams = new URLSearchParams(req.url.split('?')[1]);
            const qtd = parseInt(urlParams.get('qtd')) || 1;
            
            // Gera um array com a quantidade de parágrafos pedida
            const paragrafos = Array(qtd).fill(paragrafoLorem);
            
            // Retorna em formato JSON
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ texto: paragrafos }));
        } 
        
        // SE A ROTA NÃO EXISTIR (Erro 404)
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Página não encontrada.');
        }

    } catch (erro) {
        // O try/catch é obrigatório ao usar async/await com fs.promises
        console.error(erro);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erro interno no servidor ao tentar ler os ficheiros.');
    }
});

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}! (Acesso: http://localhost:${PORT})`);
});