package registeration

import (
	"encoding/json"
	"net/http"
	"server/dbconnection"
	"server/models"
)

func CreateHomeOwner(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var obj models.HomeOwner
	_ = json.NewDecoder(r.Body).Decode(&obj)
	dbconnection.InsertOneHomeOwner(obj)
	json.NewEncoder(w).Encode(obj)
}

func CreateCharityOrganization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var obj models.CharityOrganization
	_ = json.NewDecoder(r.Body).Decode(&obj)
	dbconnection.InsertOneCharityOrganization(obj)
	json.NewEncoder(w).Encode(obj)
}
