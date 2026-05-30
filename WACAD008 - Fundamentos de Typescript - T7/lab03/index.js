import { Carrinho } from './Carrinho.js';
import { TV, Celular, Bicicleta } from './Produtos.js';
// Instanciando um carrinho genérico que aceita qualquer tipo de IProduto
const meuCarrinho = new Carrinho();
// Captura os elementos do DOM
const form = document.getElementById('formProduto');
const selectTipo = document.getElementById('tipoProduto');
const divDinamica = document.getElementById('camposDinamicos');
// Função para exibir apenas os campos corretos baseados no produto selecionado
selectTipo.addEventListener('change', () => {
    const tipo = selectTipo.value;
    divDinamica.innerHTML = ''; // Limpa os campos anteriores
    if (tipo === 'TV') {
        divDinamica.innerHTML = `
            <input type="text" id="resolucao" placeholder="Resolução (ex: 4K)" required>
            <input type="number" id="polegadas" placeholder="Polegadas" required>
        `;
    }
    else if (tipo === 'Celular') {
        divDinamica.innerHTML = `
            <input type="text" id="memoria" placeholder="Memória (ex: 128GB)" required>
        `;
    }
    else if (tipo === 'Bicicleta') {
        divDinamica.innerHTML = `
            <input type="number" id="aro" placeholder="Tamanho do Aro" required>
        `;
    }
});
// Força o gatilho inicial para renderizar os campos da TV por padrão
selectTipo.dispatchEvent(new Event('change'));
// Evento de submissão do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = selectTipo.value;
    const modelo = document.getElementById('modelo').value;
    const fabricante = document.getElementById('fabricante').value;
    const valor = parseFloat(document.getElementById('valor').value);
    let novoProduto;
    // Instancia a classe específica baseada na escolha do utilizador
    if (tipo === 'TV') {
        const res = document.getElementById('resolucao').value;
        const pol = parseInt(document.getElementById('polegadas').value);
        novoProduto = new TV(modelo, fabricante, valor, res, pol);
    }
    else if (tipo === 'Celular') {
        const mem = document.getElementById('memoria').value;
        novoProduto = new Celular(modelo, fabricante, valor, mem);
    }
    else {
        const aro = parseInt(document.getElementById('aro').value);
        novoProduto = new Bicicleta(modelo, fabricante, valor, aro);
    }
    // Adiciona ao carrinho genérico e atualiza a interface
    meuCarrinho.adicionar(novoProduto);
    form.reset();
    selectTipo.dispatchEvent(new Event('change')); // Restaura campos dinâmicos
    atualizarDisplay();
});
// Acesso global para o botão do HTML conseguir chamar a função de apagar (Desafio)
window.removerDoCarrinho = (index) => {
    meuCarrinho.remover(index);
    atualizarDisplay();
};
function atualizarDisplay() {
    // Atualiza as estatísticas no topo da página
    const qtdEl = document.getElementById('displayQtd');
    const valorEl = document.getElementById('displayValor');
    if (qtdEl)
        qtdEl.innerText = meuCarrinho.getQuantidade().toString();
    if (valorEl)
        valorEl.innerText = `R$ ${meuCarrinho.getValorTotal().toFixed(2)}`;
    // Renderiza a lista de produtos
    const listaHtml = document.getElementById('listaCarrinho');
    if (!listaHtml)
        return;
    listaHtml.innerHTML = '';
    meuCarrinho.getItens().forEach((item, index) => {
        // Usa o nome da construtora da classe para saber se é TV, Celular ou Bicicleta
        const tipoClasse = item.constructor.name;
        listaHtml.innerHTML += `
            <div class="item-carrinho">
                <div class="info">
                    <strong>[${tipoClasse}] ${item.modelo}</strong> 
                    <small>Fab: ${item.fabricante} | R$ ${item.valor.toFixed(2)}</small>
                </div>
                <button class="btn-apagar" onclick="window.removerDoCarrinho(${index})">🗑️ Apagar</button>
            </div>
        `;
    });
}
