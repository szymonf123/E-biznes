package controllers

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"zad4/models"
)

type ProductController struct{}

func (pc *ProductController) GetProducts(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var products []models.Product
	db.Find(&products)
	return c.JSON(http.StatusOK, &products)
}

func (pc *ProductController) GetProductByID(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var product models.Product
	db.First(&product, id)

	if product.ID == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}
	return c.JSON(http.StatusOK, &product)
}

func (pc *ProductController) AddProduct(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var product models.Product
	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	if err := db.Create(&product).Error; err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, &product)
}

func (pc *ProductController) UpdateProduct(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var product models.Product
	if err := db.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	var updatedData models.Product
	if err := c.Bind(&updatedData); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid input"})
	}

	product.Name = updatedData.Name
	product.Price = updatedData.Price

	if err := db.Save(&product).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update product"})
	}

	return c.JSON(http.StatusOK, product)
}

func (pc *ProductController) DeleteProduct(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var product models.Product
	db.First(&product, id)
	if product.ID == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	if err := db.Delete(&product).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete product"})
	}

	return c.JSON(http.StatusOK, product)
}
