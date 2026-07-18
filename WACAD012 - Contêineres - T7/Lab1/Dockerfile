# 1. Define a imagem base
FROM ubuntu:latest

# 2. Atualiza os pacotes e instala o nginx
RUN apt-get update
RUN apt-get install -y nginx

# 3. Expõe a porta 7000 conforme solicitado
EXPOSE 7000

# 4. Mantém o Nginx rodando em primeiro plano
CMD ["nginx", "-g", "daemon off;"]

# --- COMANDOS PARA SUBMISSÃO (Build e Run) ---
# Comando para realizar o build da imagem:
# docker build -t webacademy-nginx .
#
# Comando para rodar o contêiner mapeando as portas:
# docker run -d --name servidor-webacademy -p 7000:7000 webacademy-nginx