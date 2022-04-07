package listing

import (
	"encoding/json"
	"net/http"
	"server/dbconnection"
	"server/models"
)

func ListItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var obj models.ItemListing
	_ = json.NewDecoder(r.Body).Decode(&obj)
	dbconnection.InsertOneItemListing(obj)
	json.NewEncoder(w).Encode(obj)
}

func UpdateItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var obj models.ItemListing
	_ = json.NewDecoder(r.Body).Decode(&obj)
	dbconnection.UpdateOneItemListing(obj)
	json.NewEncoder(w).Encode(obj)
}
