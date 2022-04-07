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
	OrganizationName string             `json:"firstName,omitempty"`
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
	HomeOwnerID     primitive.ObjectID
	HomeOwner       HomeOwner
	ListingDateTime time.Time
}
