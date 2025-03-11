package main

import (
	"auth-server/config/db"
	"auth-server/config/env"
	"auth-server/internal/handler"
	"auth-server/internal/repository"
	"auth-server/internal/service"
	"context"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/sethvargo/go-envconfig"
)

func main() {
	ctx := context.Background()

	var envConfig env.EnvConfig
	if err := envconfig.Process(ctx, &envConfig); err != nil {
		log.Fatal(err)
	}

	db, err := db.OpenConn(envConfig)
	if err != nil {
		log.Fatalf("Error connect database")
	}

	//init
	keyRepository := repository.NewKeyRepository(db)
	keysService := service.NewKeysService(keyRepository)
	keysHandler := handler.NewHandler(keysService)

	log.Default().Println("Routing...")
	e := echo.New()
	e.POST("/auth", keysHandler.AuthStreamingKey)

	e.GET("/healthcheck", func(ctx echo.Context) error {
		return ctx.String(http.StatusOK, "working")
	})
	e.Logger.Fatal(e.Start(":8000"))
}
