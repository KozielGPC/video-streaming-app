package handler

import (
	"auth-server/internal/service"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type IKeysHandler interface {
	AuthSreamingKey(ctr echo.Context) error
}

type keysHandler struct {
	keysService service.IKeyService
}

func NewHandler(serv service.IKeyService) IKeysHandler {
	return &keysHandler{
		keysService: serv,
	}
}

func (kh *keysHandler) AuthSreamingKey(ctx echo.Context) error {
	log.Default().Println("Running auth")
	body := ctx.Request().Body

	defer body.Close()

	fields, _ := io.ReadAll(body)
	fmt.Println(string(fields))

	return ctx.String(http.StatusOK, "WORKING")
}
