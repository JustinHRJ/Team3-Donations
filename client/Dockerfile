FROM node:alpine

WORKDIR /app

COPY package.json .

RUN sudo npm install

COPY . .

CMD ["npm", "start"]
