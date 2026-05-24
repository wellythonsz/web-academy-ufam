const http = require('http');
const fs = require('fs');

// Configura o dotenv para carregar as variáveis do arquivo .env para o process.env
require('dotenv').config();

// Captura o diretório passado como parâmetro no terminal
const diretorioBase = process.argv[2];

if (!diretorioBase) {
    console.error("Erro: Você precisa informar um diretório como parâmetro.");
    console.error("Uso correto: node node1.js <caminho_do_diretorio>");
    process.exit(1);
}

const server = http.createServer((req, res) => {
    fs.readdir(diretorioBase, (err, arquivos) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        if (err) {
            res.end(`
                <h2>Erro ao ler o diretório!</h2>
                <p>Caminho: <strong>${diretorioBase}</strong></p>
                <p style="color: red;">${err.message}</p>
            `);
            return;
        }

        let html = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Listagem de Diretório</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    ul { padding-left: 20px; }
                    li { padding: 5px 0; border-bottom: 1px solid #ccc; }
                </style>
            </head>
            <body>
                <h2>Conteúdo do diretório: <code>${diretorioBase}</code></h2>
                <ul>
        `;

        arquivos.forEach(item => {
            html += `<li>${item}</li>`;
        });

        html += `
                </ul>
            </body>
            </html>
        `;

        res.end(html);
    });
});

// Puxa a porta definida no arquivo .env. Se não encontrar o arquivo, usa a 3333 como reserva.
const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
    console.log(`A API está rodando a todo vapor!`);
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log(`Listando os arquivos de: ${diretorioBase}`);
});