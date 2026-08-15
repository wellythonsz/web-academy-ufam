import { PrismaClient, Prisma } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Dados fixos utilizados para facilitar a demonstração do CRUD
const emailFixo = 'cliente.lab03@email.com';
const cpfFixo = '123.456.789-00';

/*
 * CREATE
 * Cria um cliente juntamente com um endereço.
 *
 * Demonstra a relação 1:N entre Cliente e Endereco.
 */
async function createCliente() {
  console.log('\n=================================');
  console.log('       EXECUTANDO CREATE');
  console.log('=================================');

  try {
    const novoCliente = await prisma.cliente.create({
      data: {
        nome_completo: 'Carlos da Silva',
        cpf: cpfFixo,
        celular: '(92) 90000-0000',
        email: emailFixo,
        data_nascimento: new Date('1998-10-25'),

        Endereco: {
          create: {
            logradouro: 'Avenida Amazonas',
            numero: '100',
            complemento: 'Casa',
            bairro: 'Centro',
            cidade: 'Itacoatiara',
            estado: 'AM',
            cep: '69100-000'
          }
        }
      },

      include: {
        Endereco: true
      }
    });

    console.log('\n✅ Cliente cadastrado com sucesso!');
    console.dir(novoCliente, { depth: null });

  } catch (error) {

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      console.log('\n❌ Já existe um cliente com esse CPF ou e-mail.');
    } else {
      console.error('\n❌ Erro ao cadastrar cliente:', error);
    }
  }
}


/*
 * READ
 * Busca o cliente através do e-mail
 * juntamente com os seus endereços.
 */
async function readCliente() {
  console.log('\n=================================');
  console.log('        EXECUTANDO READ');
  console.log('=================================');

  const cliente = await prisma.cliente.findUnique({
    where: {
      email: emailFixo
    },

    include: {
      Endereco: true
    }
  });

  if (!cliente) {
    console.log('\n❌ Cliente não encontrado.');
    return;
  }

  console.log('\n✅ Cliente encontrado:');
  console.dir(cliente, { depth: null });
}


/*
 * UPDATE
 * Atualiza informações do Cliente
 * e também do seu Endereço.
 */
async function updateCliente() {
  console.log('\n=================================');
  console.log('       EXECUTANDO UPDATE');
  console.log('=================================');

  const cliente = await prisma.cliente.findUnique({
    where: {
      email: emailFixo
    },

    include: {
      Endereco: true
    }
  });

  if (!cliente) {
    console.log('\n❌ Cliente não encontrado.');
    return;
  }

  try {

    // Atualiza os dados do cliente
    await prisma.cliente.update({
      where: {
        id_cliente: cliente.id_cliente
      },

      data: {
        celular: '(92) 99999-9999'
      }
    });


    // Atualiza o primeiro endereço encontrado
    if (cliente.Endereco.length > 0) {

      const endereco = cliente.Endereco[0];

      await prisma.endereco.update({
        where: {
          id_endereco: endereco.id_endereco
        },

        data: {
          numero: '250',
          complemento: 'Apartamento 02'
        }
      });
    }


    // Busca novamente para mostrar o resultado
    const clienteAtualizado = await prisma.cliente.findUnique({
      where: {
        id_cliente: cliente.id_cliente
      },

      include: {
        Endereco: true
      }
    });

    console.log('\n✅ Cliente e endereço atualizados!');
    console.dir(clienteAtualizado, { depth: null });

  } catch (error) {
    console.error('\n❌ Erro durante a atualização:', error);
  }
}


/*
 * DELETE
 * Primeiro remove os endereços associados ao cliente
 * e depois remove o cliente.
 */
async function deleteCliente() {
  console.log('\n=================================');
  console.log('       EXECUTANDO DELETE');
  console.log('=================================');

  const cliente = await prisma.cliente.findUnique({
    where: {
      email: emailFixo
    }
  });

  if (!cliente) {
    console.log('\n❌ Cliente não encontrado.');
    return;
  }

  try {

    /*
     * Utilizamos uma transação para garantir
     * que as operações sejam executadas juntas.
     */
    await prisma.$transaction([

      prisma.endereco.deleteMany({
        where: {
          clienteId: cliente.id_cliente
        }
      }),

      prisma.cliente.delete({
        where: {
          id_cliente: cliente.id_cliente
        }
      })

    ]);

    console.log('\n✅ Endereço(s) removido(s).');
    console.log('✅ Cliente removido com sucesso!');

  } catch (error) {
    console.error('\n❌ Erro durante a remoção:', error);
  }
}


/*
 * MENU PRINCIPAL
 */
function exibirMenu() {

  console.log('\n======================================');
  console.log('     CRUD PRISMA - LABORATÓRIO 03');
  console.log('======================================');

  console.log('1. CREATE - Cadastrar Cliente');
  console.log('2. READ   - Consultar Cliente');
  console.log('3. UPDATE - Atualizar Cliente');
  console.log('4. DELETE - Remover Cliente');
  console.log('0. Sair');

  console.log('======================================');

  rl.question(
    'Escolha uma operação (0 a 4): ',
    async (opcao) => {

      try {

        switch (opcao) {

          case '1':
            await createCliente();
            break;

          case '2':
            await readCliente();
            break;

          case '3':
            await updateCliente();
            break;

          case '4':
            await deleteCliente();
            break;

          case '0':

            console.log('\nEncerrando aplicação...');

            await prisma.$disconnect();

            rl.close();

            return;

          default:

            console.log('\n❌ Opção inválida.');
        }

      } catch (error) {

        console.error('\n❌ Erro inesperado:', error);

      }

      exibirMenu();
    }
  );
}


exibirMenu();