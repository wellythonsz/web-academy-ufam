export class Turma {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.listaAlunos = [];
        this.idEmEdicao = null; // Controla qual aluno está sendo editado na tabela
    }
    adicionarAluno(aluno) {
        this.listaAlunos.push(aluno);
        this.atualizarDOM();
    }
    removerAluno(id) {
        this.listaAlunos = this.listaAlunos.filter(a => a.id !== id);
        this.atualizarDOM();
    }
    // ==========================================
    // NOVOS MÉTODOS DE EDIÇÃO
    // ==========================================
    iniciarEdicao(id) {
        this.idEmEdicao = id;
        this.atualizarDOM();
    }
    cancelarEdicao() {
        this.idEmEdicao = null;
        this.atualizarDOM();
    }
    salvarEdicao(id, nome, idade, altura, peso, genero) {
        const index = this.listaAlunos.findIndex(a => a.id === id);
        if (index !== -1) {
            this.listaAlunos[index].nomeCompleto = nome;
            this.listaAlunos[index].idade = idade;
            this.listaAlunos[index].altura = altura;
            this.listaAlunos[index].peso = peso;
            this.listaAlunos[index].genero = genero;
        }
        this.idEmEdicao = null; // Sai do modo de edição
        this.atualizarDOM();
    }
    // ==========================================
    // ESTATÍSTICAS E DOM
    // ==========================================
    getNumAlunos() { return this.listaAlunos.length; }
    getMediaIdades() {
        return this.getNumAlunos() ? this.listaAlunos.reduce((acc, a) => acc + a.idade, 0) / this.getNumAlunos() : 0;
    }
    getMediaAlturas() {
        return this.getNumAlunos() ? this.listaAlunos.reduce((acc, a) => acc + a.altura, 0) / this.getNumAlunos() : 0;
    }
    getMediaPesos() {
        return this.getNumAlunos() ? this.listaAlunos.reduce((acc, a) => acc + a.peso, 0) / this.getNumAlunos() : 0;
    }
    atualizarDOM() {
        const setHtml = (id, texto) => {
            const el = document.getElementById(id);
            if (el)
                el.innerText = texto;
        };
        setHtml('totAlunos', this.getNumAlunos().toString());
        setHtml('medIdade', this.getMediaIdades().toFixed(1) + ' anos');
        setHtml('medAltura', this.getMediaAlturas().toFixed(2) + ' m');
        setHtml('medPeso', this.getMediaPesos().toFixed(2) + ' kg');
        const tabela = document.getElementById('tabelaAlunos');
        if (tabela) {
            tabela.innerHTML = '';
            this.listaAlunos.forEach(aluno => {
                if (this.idEmEdicao === aluno.id) {
                    // MODO EDIÇÃO: Substitui a linha por inputs
                    tabela.innerHTML += `
                        <tr style="background-color: #f8f9fa;">
                            <td>${aluno.id}</td>
                            <td><input type="text" id="editNome_${aluno.id}" value="${aluno.nomeCompleto}" style="width: 100%; padding: 4px;"></td>
                            <td><input type="number" id="editIdade_${aluno.id}" value="${aluno.idade}" style="width: 60px; padding: 4px;"></td>
                            <td><input type="number" step="0.01" id="editAltura_${aluno.id}" value="${aluno.altura.toFixed(2)}" style="width: 70px; padding: 4px;"></td>
                            <td><input type="number" step="0.1" id="editPeso_${aluno.id}" value="${aluno.peso.toFixed(2)}" style="width: 70px; padding: 4px;"></td>
                            <td>
                                <select id="editGenero_${aluno.id}" style="padding: 4px;">
                                    <option value="Masculino" ${aluno.genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
                                    <option value="Feminino" ${aluno.genero === 'Feminino' ? 'selected' : ''}>Feminino</option>
                                </select>
                            </td>
                            <td style="display: flex; gap: 5px;">
                                <button onclick="window.salvar(${aluno.id})" style="background: #198754; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">💾 Salvar</button>
                                <button onclick="window.cancelar()" style="background: #6c757d; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">❌</button>
                            </td>
                        </tr>
                    `;
                }
                else {
                    // MODO LEITURA NORMAL: Com botões Editar e Apagar lado a lado
                    tabela.innerHTML += `
                        <tr>
                            <td>${aluno.id}</td>
                            <td>${aluno.nomeCompleto}</td>
                            <td>${aluno.idade}</td>
                            <td>${aluno.altura.toFixed(2)}</td>
                            <td>${aluno.peso.toFixed(2)}</td>
                            <td>${aluno.genero}</td>
                            <td style="display: flex; gap: 5px;">
                                <button onclick="window.editar(${aluno.id})" style="background: #ffc107; color: black; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">✏️ Editar</button>
                                <button onclick="window.remover(${aluno.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">🗑️ Apagar</button>
                            </td>
                        </tr>
                    `;
                }
            });
        }
    }
}
