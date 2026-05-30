"use strict";
// index.ts
class ToDoListWeb {
    lembretes = [];
    logado = false;
    proximoId = 1;
    login(usuario, senha) {
        if (usuario === "admin" && senha === "wacad123") {
            this.logado = true;
            return true;
        }
        return false;
    }
    adicionar(titulo, dataLimite, descricao) {
        if (!this.logado)
            return;
        const novoLembrete = [this.proximoId++, titulo, new Date(), dataLimite, descricao];
        this.lembretes.push(novoLembrete);
        this.renderizarNaTela();
    }
    apagar(id) {
        this.lembretes = this.lembretes.filter(l => l[0] !== id);
        this.renderizarNaTela();
    }
    // Método que pega a lista de tuplas e transforma em HTML
    renderizarNaTela() {
        const divLista = document.getElementById('lista-lembretes');
        if (!divLista)
            return;
        divLista.innerHTML = ''; // Limpa a lista atual
        if (this.lembretes.length === 0) {
            divLista.innerHTML = '<p style="text-align:center; color:#666;">Nenhum lembrete pendente. 😴</p>';
            return;
        }
        this.lembretes.forEach(l => {
            const dataInsercao = l[2].toLocaleDateString('pt-BR') + ' às ' + l[2].toLocaleTimeString('pt-BR');
            // Como a data limite vem do input HTML (YYYY-MM-DD), ajustamos para exibir bonito
            const prazo = l[3] ? l[3].toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : "Sem prazo definido";
            const desc = l[4] ? l[4] : "Sem descrição";
            divLista.innerHTML += `
                <div class="lembrete">
                    <strong>${l[1]}</strong>
                    <small>Adicionado em: ${dataInsercao}</small>
                    <p>📅 <b>Prazo:</b> ${prazo}<br>📝 <b>Desc.:</b> ${desc}</p>
                    <button class="btn-apagar" onclick="apagarLembrete(${l[0]})">🗑️ Apagar</button>
                </div>
            `;
        });
    }
}
// Inicializa a aplicação
const app = new ToDoListWeb();
app.renderizarNaTela();
// ==========================================
// CAPTURANDO OS CLIQUES DOS BOTÕES DO HTML
// ==========================================
// Botão de Login
document.getElementById('btnLogin')?.addEventListener('click', () => {
    // Pega os valores digitados usando Type Casting (as HTMLInputElement) para o TS não reclamar
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    if (app.login(user, pass)) {
        document.getElementById('login-section')?.classList.add('hidden');
        document.getElementById('app-section')?.classList.remove('hidden');
    }
    else {
        const msg = document.getElementById('login-msg');
        if (msg)
            msg.innerText = "❌ Usuário ou senha incorretos!";
    }
});
// Botão de Adicionar Lembrete
document.getElementById('btnAdicionar')?.addEventListener('click', () => {
    const titulo = document.getElementById('titulo').value;
    const dataHtml = document.getElementById('dataLimite').value;
    const descricao = document.getElementById('descricao').value;
    if (!titulo) {
        alert("O Título é obrigatório!");
        return;
    }
    // Se o usuário selecionou uma data, convertemos para o tipo Date do TypeScript
    const dataLimite = dataHtml ? new Date(dataHtml) : undefined;
    app.adicionar(titulo, dataLimite, descricao || undefined);
    // Limpa os campos após adicionar
    document.getElementById('titulo').value = '';
    document.getElementById('dataLimite').value = '';
    document.getElementById('descricao').value = '';
});
// Essa função precisa ser global para o botão "onclick" do HTML conseguir achá-la
window.apagarLembrete = (id) => {
    app.apagar(id);
};
