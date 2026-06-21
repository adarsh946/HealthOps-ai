FROM node:24-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "dist/index.js" ]