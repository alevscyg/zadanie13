package config

// Config ...
type Config struct {
	DatabaseURL                   string `toml:"database_url"`
	RABBITMQ_URL                  string `toml:"RABBITMQ_URL"`
	RABBITMQ_TASKFIELDVALUE_QUEUE string `toml:"RABBITMQ_TASKFIELDVALUE_QUEUE"`
}

// NewConfig ...
func NewConfig() *Config {
	return &Config{}
}
