FROM node:18.16-slim
WORKDIR /home/app

# Rodando o npm init
RUN npm init -y

COPY back.js .
EXPOSE 4000

CMD ["node", "back.js"]