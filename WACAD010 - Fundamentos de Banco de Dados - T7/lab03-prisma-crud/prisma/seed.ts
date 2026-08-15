import 'dotenv/config';
import mysql from 'mysql2/promise';
import process from 'process';

async function main() {
  console.log('Iniciando a injeção de dados sintéticos (Bypass do Prisma Client via mysql2)...');

  // 1. Conectando diretamente ao banco usando a URL do seu .env
  const connectionString = process.env.DATABASE_URL || '';
  const connection = await mysql.createConnection(connectionString);

  try {
    // 2. Criar Cliente
    const [clienteResult] = await connection.execute(
      `INSERT INTO Cliente (nome_completo, cpf, email, celular, data_nascimento) 
       VALUES ('Ana Silva', '111.222.333-44', 'ana.silva@email.com', '(11) 99999-9999', '1995-05-15')`
    );
    const clienteId = (clienteResult as any).insertId;

    // 3. Criar Endereço ligado ao Cliente
    await connection.execute(
      `INSERT INTO Endereco (logradouro, numero, bairro, cidade, estado, cep, clienteId) 
       VALUES ('Avenida Principal', '1000', 'Centro', 'São Paulo', 'SP', '01000-000', ?)`,
      [clienteId]
    );

    // 4. Criar Categoria
    const [catResult] = await connection.execute(
      `INSERT INTO Categoria (nome) VALUES ('Informática')`
    );
    const categoriaId = (catResult as any).insertId;

    // 5. Criar Subcategoria ligada à Categoria
    const [subResult] = await connection.execute(
      `INSERT INTO Subcategoria (nome, categoriaId) VALUES ('Notebooks', ?)`,
      [categoriaId]
    );
    const subcategoriaId = (subResult as any).insertId;

    // 6. Criar Produto ligado à Subcategoria
    await connection.execute(
      `INSERT INTO Produto (modelo, fabricante, preco_base, quantidade_disponivel, subcategoriaId) 
       VALUES ('Dell XPS 13', 'Dell', 7500.00, 15, ?)`,
      [subcategoriaId]
    );

    console.log('✅ Banco populado com sucesso (SQL Bruto executado)!');
    console.log('-> Cliente e Endereço criados!');
    console.log('-> Categoria, Subcategoria e Produto criados!');

  } catch (erro) {
    console.error('Erro durante a injeção de dados:', erro);
  } finally {
    // 7. Encerrar a conexão
    await connection.end();
  }
}

main();