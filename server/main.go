package main

import (
	"fmt"
	"log"
	"net/http"

	"server/router"
)

func main() {
	r := router.Router()
	// fs := http.FileServer(http.Dir("build"))
	// http.Handle("/", fs)
	fmt.Println("Starting server on the port 8888...")

	log.Fatal(http.ListenAndServe(":8888", r))
}
