package models

import "gorm.io/gorm"

type Return struct {
	gorm.Model
	UserID   uint   `json:"userID"`
	BasketID uint   `json:"basketID"`
	Basket   Basket `json:"basket" gorm:"foreignKey:BasketID"`
}
