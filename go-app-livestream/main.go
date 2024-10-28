package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type stream struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Owner string `json:"owner"`
}

var streams = []stream{
	{ID: "1", Title: "Live coding - GO Lang", Owner: "John Coltrane"},
	{ID: "2", Title: "Gaming with Friends", Owner: "Gerry Mulligan"},
	{ID: "3", Title: "Just Chatting", Owner: "Sarah Vaughan"},
}

func getStreams(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, streams)
}

func main() {
	router := gin.Default()
	router.GET("/streams", getStreams)

	router.Run("localhost:8080")
}
