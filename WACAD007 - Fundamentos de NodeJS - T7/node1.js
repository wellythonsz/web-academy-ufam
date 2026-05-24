const http = require('http');
const fs = require('fs');

// Importa a função do módulo separado que acabamos de criar
const { createLink } = require('./util');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const diretorioBase = process.argv[2];

if (!diretorioBase) {
    console.error("Erro: Você precisa informar um diretório como parâmetro.");
    process.exit(1);
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // Rota Principal: Exibe apenas os links quando o usuário acessa a raiz "/"
    if (req.url === '/') {
        fs.readdir(diretorioBase, (err, arquivos) => {
            if (err) {
                res.end(`Erro ao ler o diretório!`);
                return;
            }

            let html = '';
            // Usa a função do util.js para gerar os links sem as tags head/body
            arquivos.forEach(item => {
                html += createLink(item);
            });

            res.end(html);
        });
    } 
    // Rota de Leitura: Exibe o conteúdo do arquivo e o link Voltar
    else {
        // Pega o nome do arquivo da URL (removendo a primeira barra "/")
        const nomeArquivo = decodeURI(req.url.substring(1));
        const caminhoCompleto = `${diretorioBase}/${nomeArquivo}`;

        // Lê o conteúdo do arquivo
        fs.readFile(caminhoCompleto, 'utf8', (err, conteudo) => {
            if (err) {
                res.end(`<a href="/">Voltar</a><br><br>Não foi possível ler o arquivo.`);
                return;
            }

            // Exibe o link voltar e o conteúdo do arquivo
            res.end(`
                <a href="/">Voltar</a><br>
                ${conteudo}
            `);
        });
    }
});

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}...`);
});