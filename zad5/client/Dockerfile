FROM node:latest

WORKDIR /app
COPY . .

RUN npm install
RUN npm install -g serve
RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-p", "3000"]