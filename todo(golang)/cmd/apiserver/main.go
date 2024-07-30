package main

import (
	"flag"
	"log"

	"github.com/BurntSushi/toml"
	"github.com/alevscyg/zadanie23/internal/config"
	"github.com/alevscyg/zadanie23/internal/server"
)

var (
	configPath string
)

func init() {
	flag.StringVar(&configPath, "config-path", "config/config.toml", "path to config file")
}

func main() {
	flag.Parse()

	config := config.NewConfig()
	_, err := toml.DecodeFile(configPath, config)
	if err != nil {
		log.Fatal(err)
	}

	server.Start(config)
}
