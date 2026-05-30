// Aluno.ts
export class Aluno {
    constructor(
        public id: number,
        public nomeCompleto: string,
        public idade: number,
        public altura: number,
        public peso: number,
        public genero: string // Novo atributo para o Desafio 2
    ) {}
}