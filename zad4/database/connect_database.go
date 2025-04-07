package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"zad4/models"
)

func ConnectDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("database/ecommerce.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	err = db.AutoMigrate(&models.Product{})
	if err != nil {
		return nil
	}
	err = db.AutoMigrate(&models.Basket{})
	return db
}
