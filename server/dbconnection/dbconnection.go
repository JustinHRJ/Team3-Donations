package dbconnection

import (
	"context"
	"fmt"
	"log"
	"os"
	"server/models"

	"go.mongodb.org/mongo-driver/bson"

	"github.com/joho/godotenv"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// collection object/instance
var homeOwnerCollection, CharityOrganizationCollection *mongo.Collection

// create connection with mongo db
func init() {
	loadTheEnv()
	createDBInstance()
}

func loadTheEnv() {
	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func createDBInstance() {
	// DB connection string
	connectionString := os.Getenv("DB_URI")

	// Database Name
	dbName := os.Getenv("DB_NAME")

	// Collection name
	// collName := os.Getenv("DB_COLLECTION_NAME")

	// Set client options
	clientOptions := options.Client().ApplyURI(connectionString)

	// connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	homeOwnerCollection = client.Database(dbName).Collection("homeOwner")
	CharityOrganizationCollection = client.Database(dbName).Collection("charityOrganization")

	fmt.Println("Collection instance created!")

}

func InsertOneHomeOwner(task models.HomeOwner) {
	insertResult, err := homeOwnerCollection.InsertOne(context.Background(), task)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Homeowner Record ", insertResult.InsertedID)
}

func InsertOneCharityOrganization(task models.CharityOrganization) {
	insertResult, err := CharityOrganizationCollection.InsertOne(context.Background(), task)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Charity Organization Record ", insertResult.InsertedID)
}

func RetrieveHomeOwner(email string) (*models.HomeOwner, error) {
	var result models.HomeOwner
	if err := homeOwnerCollection.FindOne(context.Background(), bson.M{"email": email}).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}
