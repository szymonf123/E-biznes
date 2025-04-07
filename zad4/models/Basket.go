package models

import "gorm.io/gorm"

type Basket struct {
	gorm.Model
	UserID    uint `json:"user-id"`
	ProductID uint `json:"product-id"`
	Number    uint `json:"number"`
}
