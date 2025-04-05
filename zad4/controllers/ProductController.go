package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"zad4/models"
)

var products = []models.Product{}
var nextID = 1

type ProductController struct{}

func (pc *ProductController) GetProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, products)
}

func (pc *ProductController) GetProductByID(c echo.Context) error {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	for _, product := range products {
		if product.ID == id {
			return c.JSON(http.StatusOK, product)
		}
	}
	return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
}

func (pc *ProductController) AddProduct(c echo.Context) error {
	var newProduct models.Product
	if err := c.Bind(&newProduct); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	newProduct.ID = nextID
	nextID++
	products = append(products, newProduct)
	return c.JSON(http.StatusCreated, newProduct)
}

func (pc *ProductController) UpdateProduct(c echo.Context) error {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	var updatedProduct models.Product
	if err := c.Bind(&updatedProduct); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	for i, product := range products {
		if product.ID == id {
			updatedProduct.ID = id
			products[i] = updatedProduct
			return c.JSON(http.StatusOK, updatedProduct)
		}
	}

	return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
}

func (pc *ProductController) DeleteProduct(c echo.Context) error {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "id must be integer"})
	}

	for i, product := range products {
		if product.ID == id {
			products = append(products[:i], products[i+1:]...)
			return c.JSON(http.StatusOK, map[string]string{"message": "Product deleted"})
		}
	}

	return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
}
