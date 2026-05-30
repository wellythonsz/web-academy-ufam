export class Carrinho {
    constructor() {
        this.itens = [];
    }
    adicionar(produto) {
        this.itens.push(produto);
    }
    // Desafio Opcional: Remover item do carrinho
    remover(index) {
        if (index >= 0 && index < this.itens.length) {
            this.itens.splice(index, 1);
        }
    }
    getValorTotal() {
        return this.itens.reduce((total, item) => total + item.valor, 0);
    }
    getQuantidade() {
        return this.itens.length;
    }
    getItens() {
        return this.itens;
    }
}
