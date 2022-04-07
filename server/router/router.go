package router

import (
	"server/listing"
	"server/login"
	"server/registeration"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/registerHomeOwner", registeration.CreateHomeOwner).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/registerCharityOrganization", registeration.CreateCharityOrganization).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/listItem", listing.ListItem).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/updateItem", listing.UpdateItem).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/login", login.User).Methods("POST", "OPTIONS")

	return router
}
