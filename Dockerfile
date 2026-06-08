FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apk add --no-cache curl

COPY . .

RUN chmod +x /app/scripts/health-check.sh

EXPOSE 3000

CMD ["npm", "start"]