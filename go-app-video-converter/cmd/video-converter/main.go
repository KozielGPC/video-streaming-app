package main

import (
	"go-app-video-converter/internal/converter"
	"go-app-video-converter/internal/rabbitmq"
	"log/slog"
	"os"

	"github.com/streadway/amqp"
)

// func connectDatabase(){

// }

func getEnvOrDefault(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func main() {
	databaseURI := getEnvOrDefault("databaseURI", "database/database")
	println(databaseURI)

	rabbitMQURL := getEnvOrDefault("RABBITMQ_URL", "amqp://username:password@rabbitmq:5672/")

	println(rabbitMQURL)
	rabbitMQClient, err := rabbitmq.NewRabbitClient(rabbitMQURL)

	if err != nil {
		panic(err)
	}

	defer rabbitMQClient.Close()

	conversionExch := getEnvOrDefault("CONVERSION_EXCHANGE", "conversion_exchange")
	queueName := getEnvOrDefault("CONVERSION_QUEUE", "video_conversion_queue")
	conversionKey := getEnvOrDefault("CONVERSION_KEY", "conversion")

	vc := converter.NewVideoConverter(rabbitMQClient)
	// vc.Handle([]byte(`{"video_id": 1, "path": "mediatest/media/uploads/1"}`))

	msgs, err := rabbitMQClient.ConsumeMessages(conversionExch, conversionKey, queueName)

	if err != nil {
		slog.Error("failed to consume messages", slog.String("error", err.Error()))
	}

	for d := range msgs {
		go func(delivery amqp.Delivery) {
			vc.Handle(delivery)
		}(d)
	}
}
