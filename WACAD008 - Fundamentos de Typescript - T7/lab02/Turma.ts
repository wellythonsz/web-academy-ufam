// Turma.ts
import { Aluno } from './Aluno';

export class Turma {
    private listaAlunos: Aluno[] = [];

    constructor(
        public id: number,
        public nome: string
    ) {}

    adicionarAluno(aluno: Aluno): void {
        this.listaAlunos.push(aluno);
        console.log(`\n[+] Aluno(a) ${aluno.nomeCompleto} adicionado(a) com sucesso!`);
        this.exibirEstatisticas();
    }

    editarAluno(id: number, dadosAtualizados: Partial<Aluno>): void {
        const index = this.listaAlunos.findIndex(a => a.id === id);
        if (index !== -1) {
            this.listaAlunos[index] = { ...this.listaAlunos[index], ...dadosAtualizados } as Aluno;
            console.log(`\n[*] Dados do aluno ID ${id} atualizados!`);
            this.exibirEstatisticas();
        }
    }

    removerAluno(id: number): void {
        const aluno = this.listaAlunos.find(a => a.id === id);
        if (aluno) {
            this.listaAlunos = this.listaAlunos.filter(a => a.id !== id);
            console.log(`\n[-] Aluno(a) ${aluno.nomeCompleto} removido(a)!`);
            this.exibirEstatisticas();
        }
    }

    getNumAlunos(): number { return this.listaAlunos.length; }

    getMediaIdades(): number {
        if (this.getNumAlunos() === 0) return 0;
        return this.listaAlunos.reduce((acc, a) => acc + a.idade, 0) / this.getNumAlunos();
    }

    getMediaAlturas(): number {
        if (this.getNumAlunos() === 0) return 0;
        return this.listaAlunos.reduce((acc, a) => acc + a.altura, 0) / this.getNumAlunos();
    }

    getMediaPesos(): number {
        if (this.getNumAlunos() === 0) return 0;
        return this.listaAlunos.reduce((acc, a) => acc + a.peso, 0) / this.getNumAlunos();
    }

    // --- NOVO MÉTODO DO DESAFIO 2 ---
    getProporcaoGeneros(): { masc: number, fem: number } {
        const masc = this.listaAlunos.filter(a => a.genero === 'male').length;
        const fem = this.listaAlunos.filter(a => a.genero === 'female').length;
        return { masc, fem };
    }

    private exibirEstatisticas(): void {
        const generos = this.getProporcaoGeneros();
        console.log(`\n=========================================`);
        console.log(`   ESTATÍSTICAS DA TURMA: ${this.nome.toUpperCase()}`);
        console.log(`=========================================`);
        console.log(`👥 Total de Alunos : ${this.getNumAlunos()}`);
        console.log(`🚻 Gêneros         : ${generos.masc} Masc | ${generos.fem} Fem`);
        console.log(`🎂 Média de Idades : ${this.getMediaIdades().toFixed(1)} anos`);
        console.log(`📏 Média de Alturas: ${this.getMediaAlturas().toFixed(2)} m`);
        console.log(`⚖️  Média de Pesos  : ${this.getMediaPesos().toFixed(2)} kg`);
        console.log(`=========================================\n`);
    }
}