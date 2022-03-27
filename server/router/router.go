package router

import (
	"github.com/gorilla/mux"
	"server/dbconnection"
	"server/login"
)

// Router is exported and used in main.go
func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/task", dbconnection.GetAllTask).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task", dbconnection.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/task/{id}", dbconnection.TaskComplete).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/undoTask/{id}", dbconnection.UndoTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteTask/{id}", dbconnection.DeleteTask).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/deleteAllTask", dbconnection.DeleteAllTask).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/login", login.User).Methods("POST", "OPTIONS")
	return router
}
