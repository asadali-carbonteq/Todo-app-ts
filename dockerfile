FROM node:latest

WORKDIR '/app'

COPY package*.json .

COPY prisma ./prisma/

COPY . .

RUN npm ci



RUN npx prisma generate

CMD ["npm", "run", "dev"]



