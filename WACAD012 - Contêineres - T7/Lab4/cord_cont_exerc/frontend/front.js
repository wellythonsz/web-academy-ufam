const http = require('http');
const querystring = require('querystring');
const port = 3000;

const html = `
<!DOCTYPE html>
<html>
<body>
    <h2>Enviar Mensagem ao Backend</h2>
    <form method="POST" action="/enviar">
        <input type="text" name="mensagem" placeholder="Digite algo..." required />
        <button type="submit">Enviar</button>
    </form>
</body>
</html>
`;

const servidor = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if (req.method === 'POST' && req.url === '/enviar') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const dados = querystring.parse(body); // Utilizando o querystring conforme o enunciado
            
            // Enviando para o host 'backend_container' que estará na mesma rede Docker
            const opcoes = {
                hostname: 'backend_container', 
                port: 4000,
                path: '/',
                method: 'POST'
            };

            const reqBackend = http.request(opcoes, (resBackend) => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h3>Mensagem enviada com sucesso! Olhe o terminal do backend.</h3><br><a href="/">Voltar</a>');
            });

            reqBackend.write(dados.mensagem);
            reqBackend.end();
        });
    }
});

servidor.listen(port, () => console.log(`Frontend rodando na porta ${port}.`));