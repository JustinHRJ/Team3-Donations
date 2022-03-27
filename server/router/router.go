package router

import (
	"server/dbconnection"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/task", dbconnection.CreateTask).Methods("POST", "OPTIONS")

	return router
}
