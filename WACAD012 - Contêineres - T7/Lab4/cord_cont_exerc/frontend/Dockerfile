FROM node:18.16-slim
WORKDIR /home/app

# Rodando o npm init e instalando o querystring conforme enunciado
RUN npm init -y
RUN npm install querystring

COPY front.js .
EXPOSE 3000

CMD ["node", "front.js"]