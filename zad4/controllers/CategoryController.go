package controllers

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"zad4/models"
)

type CategoryController struct{}

func (cc *CategoryController) GetCategories(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var categories []models.Category
	db.Find(&categories)
	return c.JSON(http.StatusOK, &categories)
}

func (cc *CategoryController) GetCategoryByID(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var category models.Category
	db.First(&category, id)

	if category.ID == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Category not found"})
	}
	return c.JSON(http.StatusOK, &category)
}

func (cc *CategoryController) AddCategory(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var category models.Category
	if err := c.Bind(&category); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	if err := db.Create(&category).Error; err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, &category)
}

func (cc *CategoryController) UpdateCategory(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var category models.Category
	if err := db.First(&category, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Category not found"})
	}

	var updatedData models.Category
	if err := c.Bind(&updatedData); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid input"})
	}

	category.Name = updatedData.Name

	if err := db.Save(&category).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update category"})
	}

	return c.JSON(http.StatusOK, category)
}

func (cc *CategoryController) DeleteCategory(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var category models.Category
	db.First(&category, id)
	if category.ID == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Category not found"})
	}

	if err := db.Delete(&category).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete category"})
	}

	return c.JSON(http.StatusOK, category)
}
