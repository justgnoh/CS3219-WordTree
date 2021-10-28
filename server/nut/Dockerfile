FROM node:14-alpine

WORKDIR /app

COPY ["package.json","package-lock.json*","npm-shrinkwrap.json*", "./src/"]

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]