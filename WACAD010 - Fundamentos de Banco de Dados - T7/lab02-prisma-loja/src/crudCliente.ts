import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();

// Configurando o leitor de dados do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Usaremos um email fixo para facilitar as buscas no CRUD
const emailFixo = 'cliente.interativo@email.com';

async function createCliente() {
  console.log('\n[!] Executando CREATE...');
  try {
    const novo = await prisma.cliente.create({
      data: {
        nome_completo: 'Carlos Interativo',
        cpf: '111.999.888-77',
        celular: '(92) 90000-0000',
        email: emailFixo,
        data_nascimento: new Date('1998-10-25T00:00:00.000Z'),
      },
    });
    console.log('✅ Sucesso! Cliente criado:', novo);
  } catch (error) {
    console.log('❌ Erro: O cliente já existe no banco!');
  }
}

async function readCliente() {
  console.log('\n[!] Executando READ...');
  const cliente = await prisma.cliente.findUnique({
    where: { email: emailFixo },
  });
  if (cliente) {
    console.log('✅ Sucesso! Cliente encontrado:', cliente);
  } else {
    console.log('❌ Cliente não encontrado no banco.');
  }
}

async function updateCliente() {
  console.log('\n[!] Executando UPDATE...');
  try {
    const atualizado = await prisma.cliente.update({
      where: { email: emailFixo },
      data: { celular: '(92) 99999-9999' }, // Mudando o número
    });
    console.log('✅ Sucesso! Celular atualizado:', atualizado);
  } catch (error) {
    console.log('❌ Erro ao atualizar: Cliente não encontrado.');
  }
}

async function deleteCliente() {
  console.log('\n[!] Executando DELETE...');
  try {
    const deletado = await prisma.cliente.delete({
      where: { email: emailFixo },
    });
    console.log('✅ Sucesso! Cliente removido:', deletado.nome_completo);
  } catch (error) {
    console.log('❌ Erro ao deletar: Cliente não encontrado.');
  }
}

// Função principal que exibe o menu
function exibirMenu() {
  console.log('\n=================================');
  console.log('   MENU CRUD PRISMA - CLIENTES   ');
  console.log('=================================');
  console.log('1. [CREATE] Inserir Cliente');
  console.log('2. [READ]   Buscar Cliente no Console');
  console.log('3. [UPDATE] Atualizar Celular do Cliente');
  console.log('4. [DELETE] Remover Cliente');
  console.log('0. Sair');
  console.log('=================================');
  
  rl.question('Escolha uma operação (0 a 4): ', async (opcao) => {
    switch (opcao) {
      case '1': await createCliente(); break;
      case '2': await readCliente(); break;
      case '3': await updateCliente(); break;
      case '4': await deleteCliente(); break;
      case '0':
        console.log('\nSaindo e desconectando do banco... Até logo!');
        await prisma.$disconnect();
        rl.close();
        return;
      default:
        console.log('\n❌ Opção inválida! Tente novamente.');
    }
    // Mostra o menu de novo após a operação terminar
    setTimeout(exibirMenu, 1000); 
  });
}

// Inicia a aplicação
exibirMenu();