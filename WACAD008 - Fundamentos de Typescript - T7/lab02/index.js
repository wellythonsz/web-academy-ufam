// index.ts
import { Aluno } from './Aluno.js';
import { Turma } from './Turma.js';
const turmaCrossfit = new Turma(1, "Educação Física - Web");
// ==========================================
// FUNÇÕES GLOBAIS PARA O DOM (HTML)
// ==========================================
window.remover = (id) => {
    turmaCrossfit.removerAluno(id);
};
window.editar = (id) => {
    turmaCrossfit.iniciarEdicao(id);
};
window.cancelar = () => {
    turmaCrossfit.cancelarEdicao();
};
window.salvar = (id) => {
    // Captura os novos valores de dentro dos inputs dinâmicos gerados no HTML
    const nome = document.getElementById(`editNome_${id}`).value;
    const idade = parseInt(document.getElementById(`editIdade_${id}`).value);
    const altura = parseFloat(document.getElementById(`editAltura_${id}`).value);
    const peso = parseFloat(document.getElementById(`editPeso_${id}`).value);
    const genero = document.getElementById(`editGenero_${id}`).value;
    turmaCrossfit.salvarEdicao(id, nome, idade, altura, peso, genero);
};
// ==========================================
// INTEGRAÇÃO COM A API RANDOMUSER
// ==========================================
const btnGerar = document.getElementById('btnGerar');
if (btnGerar) {
    btnGerar.addEventListener('click', async () => {
        btnGerar.innerText = "⏳ Buscando alunos...";
        try {
            const response = await fetch('https://randomuser.me/api/?results=3');
            const data = await response.json();
            data.results.forEach((user) => {
                const alturaRandom = (Math.random() * (1.95 - 1.50) + 1.50);
                const pesoRandom = (Math.random() * (100 - 50) + 50);
                const novoAluno = new Aluno(Math.floor(Math.random() * 10000), // ID aleatório
                `${user.name.first} ${user.name.last}`, user.dob.age, alturaRandom, pesoRandom, user.gender === 'male' ? 'Masculino' : 'Feminino');
                turmaCrossfit.adicionarAluno(novoAluno);
            });
        }
        catch (error) {
            console.error("Erro ao buscar dados na API:", error);
        }
        btnGerar.innerText = "➕ Adicionar 3 Alunos via API";
    });
}
