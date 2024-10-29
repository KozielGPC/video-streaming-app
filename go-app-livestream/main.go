package main

import (
	db "auth-server/config"
	"auth-server/internal/handler"
	"auth-server/internal/repository"
	"auth-server/internal/service"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	db, err := db.OpenConn()
	if err != nil {
		log.Fatalf("error connecting to database")
	}

	keysRepository := repository.NewKeyRepository(db)
	keysService := service.NewKeysService(keysRepository)
	keysHandler := handler.NewHandler(keysService)

	log.Default().Println("Creating routes...")

	e := echo.New()

	e.POST("/auth", keysHandler.AuthSreamingKey)

	e.GET("/healthcheck", func(c echo.Context) error {
		return c.String(http.StatusOK, "WORKING")
	})

	e.Logger.Fatal(e.Start(":8000"))
}
