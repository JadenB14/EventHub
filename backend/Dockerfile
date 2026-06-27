FROM node:20-alpine 

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate
RUN npx prisma migrate dev

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]