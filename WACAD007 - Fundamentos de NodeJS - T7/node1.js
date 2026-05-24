const http = require('http');
const fs = require('fs');

// Captura o diretório passado como parâmetro no terminal
const diretorioBase = process.argv[2];

// Validação de segurança: verifica se o usuário passou o parâmetro
if (!diretorioBase) {
    console.error("Erro: Você precisa informar um diretório como parâmetro.");
    console.error("Uso correto: node exercicio1.js <caminho_do_diretorio>");
    process.exit(1);
}

// Cria o servidor Web
const server = http.createServer((req, res) => {
    
    // Lê o conteúdo do diretório informado
    fs.readdir(diretorioBase, (err, arquivos) => {
        // Configura o cabeçalho para retornar HTML e aceitar acentos (utf-8)
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        // Se der erro (ex: pasta não existe), retorna a mensagem na tela
        if (err) {
            res.end(`
                <h2>Erro ao ler o diretório!</h2>
                <p>Caminho: <strong>${diretorioBase}</strong></p>
                <p style="color: red;">${err.message}</p>
            `);
            return;
        }

        // Monta a estrutura HTML inicial da resposta
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

        // Faz um loop no array de arquivos/pastas e adiciona uma tag <li> para cada um
        arquivos.forEach(item => {
            html += `<li>${item}</li>`;
        });

        // Fecha as tags HTML e encerra a resposta
        html += `
                </ul>
            </body>
            </html>
        `;

        res.end(html);
    });
});

// Define a porta e inicia o servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`A API está rodando a todo vapor!`);
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log(`Listando os arquivos de: ${diretorioBase}`);
});