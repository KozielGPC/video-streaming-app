package converter

import (
	"database/sql"
	"encoding/json"
)

func IsProcessed(db *sql.DB, videoID int) bool {
	// add database connection and check if video ID is successfully processed
	return true
}

func MarkProcessed(db *sql.DB, videoID int) error {
	// add database connection to mark video as processed
	return nil
}

func RegisterError(db *sql.DB, errorData map[string]any, err error) {
	serializedError, _ := json.Marshal(errorData)

	// add serialized error into database

	println(serializedError)
}
