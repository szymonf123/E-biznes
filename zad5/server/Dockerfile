FROM golang:latest

WORKDIR /app

COPY . .

RUN go mod tidy
RUN go build -o server_app .

EXPOSE 8080

CMD ["./server_app"]