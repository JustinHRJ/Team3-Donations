package login

import (
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	"log"
	"net/http"
	"server/dbconnection"
	"time"
)

var jwtKey = []byte("secret_key")

type Claims struct {
	Username string
	jwt.StandardClaims
}

type userResult struct {
	Success   int
	ErrorMsg  string
	LoginKey  string
	FirstName string
	LastName  string
	UserType  string
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
		result.Success = 0
		result.ErrorMsg = "Backend Validation Fail. Please contact Administrator"
	} else {
		record, error := dbconnection.RetrieveHomeOwner(t.Email)
		if error != nil {
			result.Success = 0
			result.ErrorMsg = "Incorrect Email or Password Credentials"
			w.WriteHeader(http.StatusUnauthorized)
		} else {
			if record.Email == t.Email && record.Password == t.Password {
				result.Success = 1
				result.FirstName = record.FirstName
				result.LastName = record.LastName
				result.UserType = "homeOwner"
				expirationTime := time.Now().Add(time.Minute * 20)
				claims := &Claims{
					Username: t.Email,
					StandardClaims: jwt.StandardClaims{
						ExpiresAt: expirationTime.Unix(),
					},
				}
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
				tokenString, err := token.SignedString(jwtKey)
				if err != nil {
					result.Success = 0
					result.ErrorMsg = "Trouble with JWT token signing"
					w.WriteHeader(http.StatusGatewayTimeout)
				} else {
					result.LoginKey = tokenString
					http.SetCookie(w, &http.Cookie{
						Name:    "token",
						Value:   tokenString,
						Expires: expirationTime,
					})
				}
			} else {
				result.Success = 0
				result.ErrorMsg = "Incorrect Email or Password Credentials"
				w.WriteHeader(http.StatusUnauthorized)
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
