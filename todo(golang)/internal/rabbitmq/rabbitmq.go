package rabbitmq

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/alevscyg/zadanie23/internal/handler"
	"github.com/alevscyg/zadanie23/internal/model"
	sqlstorage "github.com/alevscyg/zadanie23/storage/sqlStorage"
	"github.com/jmoiron/sqlx"
	"github.com/rabbitmq/amqp091-go"
)

type Data struct {
	TaskId        int
	TaskFieldId   int
	TaskFieldStr  string
	TaskFieldInt  int
	TaskFieldType string
}

type ToDo struct {
	Pattern string
	Data    Data
	Id      string
}

type GetByTaskId struct {
	TaskFieldInt []model.TaskFieldInt
	TaskFieldStr []model.TaskFieldStr
}

func newDB(dbURL string) (*sqlx.DB, error) {
	db, err := sqlx.Open("postgres", dbURL)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func RabbitMqStart(RABBITMQ_URL string, RABBITMQ_TASKFIELDVALUE_QUEUE string, DatabaseURL string) {
	fmt.Println("Consumer app")

	db, err := newDB(DatabaseURL)
	failOnError(err, "Failed to connect to Database")
	defer db.Close()
	store := sqlstorage.New(db)

	conn, err := amqp091.Dial(RABBITMQ_URL)
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		RABBITMQ_TASKFIELDVALUE_QUEUE, // name
		false,                         // durable
		false,                         // delete when unused
		false,                         // exclusive
		false,                         // no-wait
		nil,                           // arguments
	)
	failOnError(err, "Failed to declare a queue")

	err = ch.Qos(
		1,     // prefetch count
		0,     // prefetch size
		false, // global
	)
	failOnError(err, "Failed to set QoS")

	msgs, err := ch.Consume(
		q.Name,                        // queue
		RABBITMQ_TASKFIELDVALUE_QUEUE, // consumer
		true,                          // auto-ack
		false,                         // exclusive
		false,                         // no-local
		false,                         // no-wait
		nil,                           // args
	)
	failOnError(err, "Failed to register a consumer")

	var forever chan struct{}

	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		for d := range msgs {
			toDo := ToDo{}
			err := json.Unmarshal([]byte(d.Body), &toDo)
			failOnError(err, "Failed to publish a message")
			if toDo.Pattern == "createTaskFiledInt" {
				// Create int
				result, err := handler.CreateTaskFieldInt(toDo.Data.TaskId, toDo.Data.TaskFieldId, toDo.Data.TaskFieldInt, store)
				failOnError(err, "Failed RequestHandler")
				body, err := json.Marshal(result)
				failOnError(err, "Failed Marshal")
				err = ch.PublishWithContext(ctx,
					"",        // exchange
					d.ReplyTo, // routing key
					false,     // mandatory
					false,     // immediate
					amqp091.Publishing{
						ContentType:   "application/json",
						CorrelationId: d.CorrelationId,
						Body:          []byte(body),
					})
				failOnError(err, "Failed to publish a message")
			} else if toDo.Pattern == "createTaskFiledStr" {
				// Create str
				result, err := handler.CreateTaskFieldStr(toDo.Data.TaskId, toDo.Data.TaskFieldId, toDo.Data.TaskFieldStr, store)
				failOnError(err, "Failed RequestHandler")
				body, err := json.Marshal(result)
				failOnError(err, "Failed Marshal")
				err = ch.PublishWithContext(ctx,
					"",        // exchange
					d.ReplyTo, // routing key
					false,     // mandatory
					false,     // immediate
					amqp091.Publishing{
						ContentType:   "application/json",
						CorrelationId: d.CorrelationId,
						Body:          []byte(body),
					})
				failOnError(err, "Failed to publish a message")
			} else if toDo.Pattern == "updateTaskFiledInt" {
				// Update int
				result, err := handler.UpdateTaskFieldInt(toDo.Data.TaskId, toDo.Data.TaskFieldId, toDo.Data.TaskFieldInt, store)
				failOnError(err, "Failed RequestHandler")
				body, err := json.Marshal(result)
				failOnError(err, "Failed Marshal")
				err = ch.PublishWithContext(ctx,
					"",        // exchange
					d.ReplyTo, // routing key
					false,     // mandatory
					false,     // immediate
					amqp091.Publishing{
						ContentType:   "application/json",
						CorrelationId: d.CorrelationId,
						Body:          []byte(body),
					})
				failOnError(err, "Failed to publish a message")
			} else if toDo.Pattern == "updateTaskFiledStr" {
				// Update str
				result, err := handler.UpdateTaskFieldStr(toDo.Data.TaskId, toDo.Data.TaskFieldId, toDo.Data.TaskFieldStr, store)
				failOnError(err, "Failed RequestHandler")
				body, err := json.Marshal(result)
				failOnError(err, "Failed Marshal")
				err = ch.PublishWithContext(ctx,
					"",        // exchange
					d.ReplyTo, // routing key
					false,     // mandatory
					false,     // immediate
					amqp091.Publishing{
						ContentType:   "application/json",
						CorrelationId: d.CorrelationId,
						Body:          []byte(body),
					})
				failOnError(err, "Failed to publish a message")
			} else if toDo.Pattern == "getAllTaskFiledValuesByTaskId" {
				// GetByTaskId
				resultInt, err := handler.GetAllTaskFieldIntByTaskId(toDo.Data.TaskId, store)
				failOnError(err, "Failed RequestHandler")
				resultStr, err := handler.GetAllTaskFieldStrByTaskId(toDo.Data.TaskId, store)
				failOnError(err, "Failed RequestHandler")
				getByTaskId := GetByTaskId{
					TaskFieldInt: resultInt,
					TaskFieldStr: resultStr,
				}
				body, err := json.Marshal(getByTaskId)
				failOnError(err, "Failed Marshal")
				err = ch.PublishWithContext(ctx,
					"",        // exchange
					d.ReplyTo, // routing key
					false,     // mandatory
					false,     // immediate
					amqp091.Publishing{
						ContentType:   "application/json",
						CorrelationId: d.CorrelationId,
						Body:          []byte(body),
					})
				failOnError(err, "Failed to publish a message")
			} else if toDo.Pattern == "getTaskFiledValueByTaskFieldId" {
				// GetByTaskFieldId
				if toDo.Data.TaskFieldType == "int" {
					result, err := handler.GetTaskFieldIntByTaskFieldId(toDo.Data.TaskId, toDo.Data.TaskFieldId, store)
					failOnError(err, "Failed RequestHandler")
					body, err := json.Marshal(result)
					failOnError(err, "Failed Marshal")
					err = ch.PublishWithContext(ctx,
						"",        // exchange
						d.ReplyTo, // routing key
						false,     // mandatory
						false,     // immediate
						amqp091.Publishing{
							ContentType:   "application/json",
							CorrelationId: d.CorrelationId,
							Body:          []byte(body),
						})
					failOnError(err, "Failed to publish a message")
				} else if toDo.Data.TaskFieldType == "str" {
					result, err := handler.GetTaskFieldStrByTaskFieldId(toDo.Data.TaskId, toDo.Data.TaskFieldId, store)
					failOnError(err, "Failed RequestHandler")
					body, err := json.Marshal(result)
					failOnError(err, "Failed Marshal")
					err = ch.PublishWithContext(ctx,
						"",        // exchange
						d.ReplyTo, // routing key
						false,     // mandatory
						false,     // immediate
						amqp091.Publishing{
							ContentType:   "application/json",
							CorrelationId: d.CorrelationId,
							Body:          []byte(body),
						})
					failOnError(err, "Failed to publish a message")
				}
			} else if toDo.Pattern == "deleteTaskFiledValue" {
				if toDo.Data.TaskFieldType == "int" {
					err := handler.DeleteTaskFieldIntByTaskFieldId(toDo.Data.TaskId, toDo.Data.TaskFieldId, store)
					failOnError(err, "Failed RequestHandler")
					err = ch.PublishWithContext(ctx,
						"",        // exchange
						d.ReplyTo, // routing key
						false,     // mandatory
						false,     // immediate
						amqp091.Publishing{
							ContentType:   "application/json",
							CorrelationId: d.CorrelationId,
							Body:          []byte("ok"),
						})
					failOnError(err, "Failed to publish a message")
				} else if toDo.Data.TaskFieldType == "str" {
					err := handler.DeleteTaskFieldStrByTaskFieldId(toDo.Data.TaskId, toDo.Data.TaskFieldId, store)
					failOnError(err, "Failed RequestHandler")
					err = ch.PublishWithContext(ctx,
						"",        // exchange
						d.ReplyTo, // routing key
						false,     // mandatory
						false,     // immediate
						amqp091.Publishing{
							ContentType:   "application/json",
							CorrelationId: d.CorrelationId,
							Body:          []byte("ok"),
						})
					failOnError(err, "Failed to publish a message")
				}
			}
		}
	}()

	log.Printf(" [*] Awaiting RPC requests")
	<-forever
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}
