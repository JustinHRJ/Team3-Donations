package login

import (
	"net/http"
)

type userResult struct {
	Success   int
	ErrorMsg  string
	LoginKey  string
	FirstName string
	LastName  string
}

func User(w http.ResponseWriter, r *http.Request) {
	//TODO: retrieve the POST object

	//TODO: check database for the record

	//TODO: set results (pass or fail)

	//TODO: return results
	//w.Header().Set("Content-Type", "application/json")

}
