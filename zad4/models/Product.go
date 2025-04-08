package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name       string   `json:"name"`
	Price      float64  `json:"price"`
	CategoryID uint     `json:"categoryID"`
	Category   Category `json:"category" gorm:"foreignKey:CategoryID"`
}
