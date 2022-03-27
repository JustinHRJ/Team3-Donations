package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type HomeOwner struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FirstName string             `json:"firstName,omitempty"`
	LastName  string             `json:"lastName,omitempty"`
	Email     string             `json:"email,omitempty"`
	Password  string             `json:"password,omitempty"`
	Address   string             `json:"address,omitempty"`
	Region    string             `json:"region,omitempty"`
}