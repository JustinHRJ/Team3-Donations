package dbconnection

import (
	"context"
	"fmt"
	"log"
	"os"
	"server/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/joho/godotenv"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// collection object/instance
var homeOwnerCollection, CharityOrganizationCollection, itemListingCollection *mongo.Collection

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
	itemListingCollection = client.Database(dbName).Collection("itemListing")

	fmt.Println("Collection instance created!")

}

//CHARITY ORGANIZATION
func InsertOneCharityOrganization(task models.CharityOrganization) {
	insertResult, err := CharityOrganizationCollection.InsertOne(context.Background(), task)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Charity Organization Record ", insertResult.InsertedID)
}

//HOME OWNER
func InsertOneHomeOwner(task models.HomeOwner) {
	insertResult, err := homeOwnerCollection.InsertOne(context.Background(), task)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Homeowner Record ", insertResult.InsertedID)
}

func RetrieveHomeOwner(email string) (*models.HomeOwner, error) {
	var result models.HomeOwner
	if err := homeOwnerCollection.FindOne(context.Background(), bson.M{"email": email}).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}

//ITEM LISTING
func InsertOneItemListing(task models.ItemListing) {
	insertResult, err := itemListingCollection.InsertOne(context.Background(), task)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Item Listing Record ", insertResult.InsertedID)
}

func RetrieveOneItemListingByItemListingID(itemListingID primitive.ObjectID) (*models.ItemListing, error) {
	var result models.ItemListing
	if err := itemListingCollection.FindOne(context.Background(), bson.M{"_id": itemListingID}).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}

func RetrieveAllItemListingsByHomeOwnerID(homeOwnerID primitive.ObjectID) (*[]models.ItemListing, error) {
	cursor, err := itemListingCollection.Find(context.TODO(), bson.M{"homeownerid": homeOwnerID})

	if err != nil {
		log.Fatal(err)
	}

	var itemListings []models.ItemListing
	if err = cursor.All(context.TODO(), &itemListings); err != nil {
		log.Fatal(err)
	}

	return &itemListings, nil
}

func UpdateOneItemListing(itemListing models.ItemListing) bool {
	filter := bson.M{"$and": []interface{}{bson.M{"_id": itemListing.ID}}}
	update := bson.M{"$set": bson.M{"itemname": itemListing.ItemName, "itemdescription": itemListing.ItemDescription,
		"homeownerid": itemListing.HomeOwnerID, "homeowner": itemListing.HomeOwner, "listingdatetime": itemListing.ListingDateTime}}

	_, err := itemListingCollection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		fmt.Println("Error updating Item Listing", err)
		return false
	}

	fmt.Println("Update Item Listing successful")
	return true
}
