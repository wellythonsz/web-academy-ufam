// Carrinho.ts
import { IProduto } from './IProduto.js';

export class Carrinho<T extends IProduto> {
    private itens: T[] = [];

    adicionar(produto: T): void {
        this.itens.push(produto);
    }

    // Desafio Opcional: Remover item do carrinho
    remover(index: number): void {
        if (index >= 0 && index < this.itens.length) {
            this.itens.splice(index, 1);
        }
    }

    getValorTotal(): number {
        return this.itens.reduce((total, item) => total + item.valor, 0);
    }

    getQuantidade(): number {
        return this.itens.length;
    }

    getItens(): T[] {
        return this.itens;
    }
}