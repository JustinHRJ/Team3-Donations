package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type HomeOwner struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FirstName string             `json:"firstName,omitempty"`
	LastName  string             `json:"lastName,omitempty"`
	Email     string             `json:"email,omitempty"`
	Password  string             `json:"password,omitempty"`
	Address   string             `json:"address,omitempty"`
	Region    string             `json:"region,omitempty"`
}

type CharityOrganization struct {
	ID               primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	OrganizationName string             `json:"organizationName,omitempty"`
	Email            string             `json:"email,omitempty"`
	Password         string             `json:"password,omitempty"`
	Address          string             `json:"address,omitempty"`
	Region           string             `json:"region,omitempty"`
	RegionOfInterest string             `json:"regionOfInterest,omitempty"`
}

type ItemListing struct {
	ID              primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ItemName        string             `json:"itemName,omitempty"`
	ItemDescription string             `json:"itemDescription,omitempty"`
	HomeOwnerID     primitive.ObjectID `json:"homeOwnerID,omitempty"`
	HomeOwner       HomeOwner          `json:"homeOwner,omitempty"`
	ListingDateTime time.Time          `json:"listingDateTime,omitempty"`
}

type Event struct {
	ID              primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	DateTime        time.Time          `json:"dateTime,omitempty"`
	Region          string             `json:"region,omitempty"`
	Detail          string             `json:"detail,omitempty"`
	Status          string             `json:"status,omitempty"`
	CreatedDateTime time.Time          `json:"createdDateTime,omitempty"`
}
