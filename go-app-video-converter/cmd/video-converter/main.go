package main

import (
	"go-app-video-converter/internal/converter"
	"os"
)

// func connectDatabase(){

// }

func getEnvOrDefault(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func main() {
	databaseURI := getEnvOrDefault("databaseURI", "database/database")
	println(databaseURI)
	vc := converter.NewVideoConverter()
	vc.Handle([]byte(`{"video_id": 1, "path": "mediatest/media/uploads/1"}`))
}
