FROM node:20-alpine 

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

RUN npm run build

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 4000

CMD ["npm", "run", "dev"]