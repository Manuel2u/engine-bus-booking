FROM --platform=linux/amd64 node:18.17.1

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn global add nodemon

RUN yarn install


EXPOSE 80

COPY . .

RUN  yarn run build

CMD yarn start --bind 0.0.0.0:$PORT



