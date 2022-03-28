package login

import (
	"encoding/json"
	"log"
	"net/http"
	"server/dbconnection"
)

type userResult struct {
	Success   int
	ErrorMsg  string
	LoginKey  string
	FirstName string
	LastName  string
}

type userCredential struct {
	Email    string
	Password string
}

func User(w http.ResponseWriter, r *http.Request) {
	// extract the body message from the post object
	decoder := json.NewDecoder(r.Body)
	var t userCredential
	err := decoder.Decode(&t)

	var result userResult
	// flag as error if there is a problem with the extraction
	if err != nil {
		log.Println(err)
		result.Success = 0
		result.ErrorMsg = "Backend Validation Fail. Please contact Administrator"
	} else {
		record, error := dbconnection.RetrieveHomeOwner(t.Email)
		if error != nil {
			log.Println(error)
			result.Success = 0
			result.ErrorMsg = "No such Email was found. Please Register"
		} else {
			if record.Email == t.Email && record.Password == t.Password {
				result.Success = 1
				result.FirstName = record.FirstName
				result.LastName = record.LastName
				//TODO: assign Login Key for authentication purposes
				result.LoginKey = "123"
			} else {
				result.Success = 0
				result.ErrorMsg = "Incorrect Email or Password Credentials"
			}
		}
	}
	// writing out the error as JSON for response
	w.Header().Set("Content-Type", "application/json")
	out, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		log.Println(err)
		return
	}
	w.Write(out)
}
