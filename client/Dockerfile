FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --loglevel verbose -g --unsafe-perm=true --allow-root

COPY . .

CMD ["npm", "start"]
