package rabbitmq

import (
	"fmt"

	"github.com/streadway/amqp"
)

type RabbitmqClient struct {
	conn    *amqp.Connection
	channel *amqp.Channel
	url     string
}

func newConnection(url string) (*amqp.Connection, *amqp.Channel, error) {
	conn, err := amqp.Dial(url)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to connect to RabbitMQ: %w", err)
	}

	channel, err := conn.Channel()
	if err != nil {
		return nil, nil, fmt.Errorf("failed to open a channel: %w", err)
	}
	return conn, channel, nil
}

func NewRabbitClient(connectionURL string) (*RabbitmqClient, error) {
	conn, channel, err := newConnection(connectionURL)
	if err != nil {
		return nil, err
	}

	return &RabbitmqClient{
		conn:    conn,
		channel: channel,
		url:     connectionURL,
	}, nil
}

func (client *RabbitmqClient) ConsumeMessages(exchange, routingKey, queueName string) (<-chan amqp.Delivery, error) {
	err := client.channel.ExchangeDeclare(
		exchange,
		"direct",
		true,
		true,
		false,
		false,
		nil,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to declare exchange: %w", err)
	}

	queue, err := client.channel.QueueDeclare(
		queueName,
		true,
		true,
		false,
		false,
		nil,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to declare queue: %w", err)
	}

	err = client.channel.QueueBind(
		queue.Name,
		routingKey,
		exchange,
		false,
		nil,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to bind queue: %w", err)
	}

	msgs, err := client.channel.Consume(
		queueName,
		"goapp",
		false,
		false,
		false,
		false,
		nil,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to consume messages from queue: %w", err)
	}

	return msgs, nil
}

func (client *RabbitmqClient) Close() {
	client.channel.Close()
	client.conn.Close()
}
