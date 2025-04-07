package controllers

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"zad4/models"
)

type BasketController struct{}

func (bc *BasketController) GetBasket(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var baskets []models.Basket
	db.Find(&baskets)
	return c.JSON(http.StatusOK, &baskets)
}

func (bc *BasketController) GetBasketByID(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var basket models.Basket
	db.First(&basket, id)

	if basket.ID == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Basket not found"})
	}
	return c.JSON(http.StatusOK, &basket)
}

func (bc *BasketController) AddBasket(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var basket models.Basket
	if err := c.Bind(&basket); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	if err := db.Create(&basket).Error; err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, &basket)
}

func (bc *BasketController) UpdateBasket(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var basket models.Basket
	if err := db.First(&basket, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Basket not found"})
	}

	var updatedData models.Basket
	if err := c.Bind(&updatedData); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid input"})
	}

	basket.UserID = updatedData.UserID
	basket.ProductID = updatedData.ProductID
	basket.Number = updatedData.Number

	if err := db.Save(&basket).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update basket"})
	}

	return c.JSON(http.StatusOK, basket)
}

func (bc *BasketController) DeleteBasket(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var basket models.Basket
	db.First(&basket, id)
	if basket.ID == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Basket not found"})
	}

	if err := db.Delete(&basket).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete basket"})
	}

	return c.JSON(http.StatusOK, basket)
}
