document.getElementById('btnGerar').addEventListener('click', async () => {
    const qtd = document.getElementById('paragrafos').value;
    const resultadoDiv = document.getElementById('resultado');
    
    // Faz um pedido ao nosso servidor Node
    const resposta = await fetch(`/api/lorem?qtd=${qtd}`);
    const dados = await resposta.json();
    
    // Limpa o ecrã e injeta os novos parágrafos
    resultadoDiv.innerHTML = '';
    dados.texto.forEach(paragrafo => {
        resultadoDiv.innerHTML += `<p>${paragrafo}</p>`;
    });
});