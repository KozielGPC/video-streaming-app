FROM golang:1.23-alpine

WORKDIR /app

COPY . /app
RUN go build -o stream-key-manager main.go

ENTRYPOINT ["./stream-key-manager"]

EXPOSE 8000