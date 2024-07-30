package server

import (
	"github.com/alevscyg/zadanie23/internal/config"
	"github.com/alevscyg/zadanie23/internal/rabbitmq"
)

// Start ...
func Start(config *config.Config) {
	rabbitmq.RabbitMqStart(config.RABBITMQ_URL, config.RABBITMQ_TASKFIELDVALUE_QUEUE, config.DatabaseURL)
}
