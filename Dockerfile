FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_URI=3.84.167.56

EXPOSE 3000

CMD ["node", "app.js"]
