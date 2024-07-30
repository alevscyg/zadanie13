.PHONY: build
build:
	go build -v ./cmd/apiserver && migrate -path migrations -database "postgres://postgres:qwe@localhost/db_golang?sslmode=disable" up
test:
	go test -v -cover ./...

.DEFAULT_GOAL := build