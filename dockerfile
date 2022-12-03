FROM node:19-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "preview", "--", "--host"]
