// index.ts
import { Aluno } from './Aluno';
import { Turma } from './Turma';

const turmaCrossfit = new Turma(1, "Educação Física - API Mode");

// --- DESAFIO 1: FUNÇÃO PARA BUSCAR ALUNOS NA API ---
async function popularTurmaComAPI(quantidade: number) {
    console.log(`\n⏳ Buscando ${quantidade} alunos na API RandomUser...\n`);
    
    try {
        // Faz a requisição para a API pedindo o número exato de resultados
        const response = await fetch(`https://randomuser.me/api/?results=${quantidade}`);
        const data = await response.json();

        // Itera sobre o array de pessoas que a API retornou
        data.results.forEach((user: any, index: number) => {
            // Gerando altura (entre 1.50 e 1.95) e peso (entre 50 e 100) aleatoriamente, já que a API não fornece
            const alturaRandom = (Math.random() * (1.95 - 1.50) + 1.50);
            const pesoRandom = (Math.random() * (100 - 50) + 50);

            // Instanciando o nosso objeto Aluno com os dados reais misturados com os aleatórios
            const novoAluno = new Aluno(
                index + 1, 
                `${user.name.first} ${user.name.last}`, 
                user.dob.age, 
                alturaRandom, 
                pesoRandom, 
                user.gender
            );

            // Adiciona na turma (isso vai acionar nosso display automático várias vezes)
            turmaCrossfit.adicionarAluno(novoAluno);
        });
        
    } catch (error) {
        console.error("Erro ao buscar dados na API:", error);
    }
}

// Vamos pedir 3 alunos gerados automaticamente para a API!
popularTurmaComAPI(3);