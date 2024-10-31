package db

import (
	"auth-server/config/env"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func OpenConn(conf env.EnvConfig) (*sql.DB, error) {
	connectionStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", conf.PostgresHost, conf.PostgresPort, conf.PostgresUser, conf.PostgresPass, conf.PostgresDB)

	db, err := sql.Open("postgres", connectionStr)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	return db, err
}
