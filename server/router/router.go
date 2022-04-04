package router

import (
	"server/login"
	"server/registeration"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/registerHomeOwner", registeration.CreateHomeOwner).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/registerCharityOrganization", registeration.CreateCharityOrganization).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/login", login.User).Methods("POST", "OPTIONS")

	return router
}
