FROM node

RUN npm install --global nodemon

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","start"]