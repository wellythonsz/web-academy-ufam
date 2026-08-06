"use strict";
class ToDoListWeb {
    constructor() {
        this.lembretes = [];
        this.logado = false;
        this.proximoId = 1;
    }
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
    editar(id, novoTitulo, novaDataLimite, novaDescricao) {
        if (!this.logado)
            return;
        const index = this.lembretes.findIndex(l => l[0] === id);
        if (index !== -1) {
            this.lembretes[index][1] = novoTitulo;
            this.lembretes[index][3] = novaDataLimite;
            this.lembretes[index][4] = novaDescricao;
            this.renderizarNaTela();
        }
    }
    apagar(id) {
        this.lembretes = this.lembretes.filter(l => l[0] !== id);
        this.renderizarNaTela();
    }
    // Método novo para buscar os dados de um lembrete específico
    getLembrete(id) {
        return this.lembretes.find(l => l[0] === id);
    }
    renderizarNaTela() {
        const divLista = document.getElementById('lista-lembretes');
        if (!divLista)
            return;
        divLista.innerHTML = '';
        if (this.lembretes.length === 0) {
            divLista.innerHTML = '<p style="text-align:center; color:#666;">Nenhum lembrete pendente. 😴</p>';
            return;
        }
        this.lembretes.forEach(l => {
            const dataInsercao = l[2].toLocaleDateString('pt-BR') + ' às ' + l[2].toLocaleTimeString('pt-BR');
            const prazo = l[3] ? l[3].toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : "Sem prazo definido";
            const desc = l[4] ? l[4] : "Sem descrição";
            // Layout ajustado: flexbox para alinhar os botões lado a lado e ocupar espaço igual (flex: 1)
            divLista.innerHTML += `
                <div class="lembrete" style="background: white; border-left: 4px solid #0d6efd; padding: 15px; margin-bottom: 10px; border-radius: 0 4px 4px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <strong style="font-size: 1.1em;">${l[1]}</strong>
                    <small style="display: block; color: #6c757d; margin-bottom: 8px;">Adicionado em: ${dataInsercao}</small>
                    <p style="margin: 0 0 10px 0; font-size: 0.95em;">📅 <b>Prazo:</b> ${prazo}<br>📝 <b>Desc.:</b> ${desc}</p>
                    
                    <div style="display: flex; gap: 10px;">
                        <button onclick="iniciarEdicao(${l[0]})" style="flex: 1; background-color: #ffc107; color: #000; border: none; padding: 8px; border-radius: 4px; cursor: pointer; font-weight: bold;">✏️ Editar</button>
                        <button onclick="apagarLembrete(${l[0]})" style="flex: 1; background-color: #dc3545; color: #fff; border: none; padding: 8px; border-radius: 4px; cursor: pointer; font-weight: bold;">🗑️ Apagar</button>
                    </div>
                </div>
            `;
        });
    }
}
const app = new ToDoListWeb();
app.renderizarNaTela();
document.getElementById('btnLogin')?.addEventListener('click', () => {
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
// Variável global para controlar se estamos adicionando ou editando
let idEmEdicao = null;
document.getElementById('btnAdicionar')?.addEventListener('click', () => {
    const tituloInput = document.getElementById('titulo');
    const dataInput = document.getElementById('dataLimite');
    const descInput = document.getElementById('descricao');
    const titulo = tituloInput.value;
    const dataHtml = dataInput.value;
    const descricao = descInput.value;
    if (!titulo) {
        alert("O Título é obrigatório!");
        return;
    }
    const dataLimite = dataHtml ? new Date(dataHtml) : undefined;
    if (idEmEdicao !== null) {
        // Se tem um ID, significa que estamos salvando uma edição
        app.editar(idEmEdicao, titulo, dataLimite, descricao || undefined);
        idEmEdicao = null; // Sai do modo de edição
        // Volta o botão ao normal
        const btn = document.getElementById('btnAdicionar');
        if (btn) {
            btn.innerHTML = "➕ Adicionar Lembrete";
            btn.style.backgroundColor = "";
        }
    }
    else {
        // Se não tem ID, é um lembrete novo
        app.adicionar(titulo, dataLimite, descricao || undefined);
    }
    // Limpa os campos
    tituloInput.value = '';
    dataInput.value = '';
    descInput.value = '';
});
// Nova função que joga os dados para cima no formulário
window.iniciarEdicao = (id) => {
    const lembrete = app.getLembrete(id);
    if (!lembrete)
        return;
    // Preenche os campos HTML
    document.getElementById('titulo').value = lembrete[1];
    document.getElementById('descricao').value = lembrete[4] || '';
    if (lembrete[3]) {
        const ano = lembrete[3].getUTCFullYear();
        const mes = String(lembrete[3].getUTCMonth() + 1).padStart(2, '0');
        const dia = String(lembrete[3].getUTCDate()).padStart(2, '0');
        document.getElementById('dataLimite').value = `${ano}-${mes}-${dia}`;
    }
    else {
        document.getElementById('dataLimite').value = '';
    }
    // Muda o estado do sistema para "Modo de Edição"
    idEmEdicao = id;
    const btn = document.getElementById('btnAdicionar');
    if (btn) {
        btn.innerHTML = "💾 Salvar Alterações";
        btn.style.backgroundColor = "#198754"; // Fica verde
    }
    // Rola a tela para cima suavemente para o usuário ver o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
window.apagarLembrete = (id) => {
    app.apagar(id);
};
