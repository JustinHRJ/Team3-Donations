FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --allow-root

COPY . .

CMD ["npm", "start"]
