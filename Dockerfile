# Use Node.js image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 9000

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
