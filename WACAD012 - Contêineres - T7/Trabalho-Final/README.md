# Trabalho Final - Web Academy (Contêineres)

## Pré-requisitos
Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.

## Como executar a aplicação
1. Clone este repositório.
2. Abra o terminal na raiz do projeto.
3. Execute o comando abaixo para construir as imagens e subir todos os serviços:
   ```bash
   docker compose up -d --build

```

## Acesso às Aplicações

* **Frontend:** [http://localhost:8000](http://localhost:8000)
* **Backend:** [http://localhost:4444](http://localhost:4444)
* **PHPMyAdmin:** [http://localhost:8080](http://localhost:8080) (Usuário: `root` | Senha: `senha_root_db`)

## Verificação de Persistência (Volumes)

Para testar a persistência dos volumes (Banco de Dados e Logs do Backend), você pode desligar e apagar os contêineres com o comando:

```bash
docker compose down

```

E recriá-los novamente com:

```bash
docker compose up -d

```

Os dados inseridos no banco e os logs gerados permanecerão intactos graças aos volumes mapeados (`vol_mysql` e `vol_backend_logs`).