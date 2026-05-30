// Produtos.ts
import { IProduto } from './IProduto.js';

export class TV implements IProduto {
    constructor(
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public resolucao: string,
        public polegadas: number
    ) {}
}

export class Celular implements IProduto {
    constructor(
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public memoria: string
    ) {}
}

export class Bicicleta implements IProduto {
    constructor(
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public tamanhoAro: number
    ) {}
}