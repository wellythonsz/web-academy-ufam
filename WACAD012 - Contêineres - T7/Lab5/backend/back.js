const http = require('http');
const port = 4000;

const servidor = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(`Mensagem recebida do front: ${body}`);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Mensagem recebida pelo backend!');
        });
    }
});

servidor.listen(port, () => console.log(`SERVIDOR RODANDO VIOLENTAMENTE NA PORTA ${port}.`));