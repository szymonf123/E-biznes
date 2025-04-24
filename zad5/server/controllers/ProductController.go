package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/models"
)

var products = []models.Product{
	{Name: "Laptop", Price: 3999.99},
	{Name: "Smartfon", Price: 2499.00},
	{Name: "Słuchawki", Price: 299.99},
	{Name: "Monitor", Price: 899.50},
	{Name: "Klawiatura mechaniczna", Price: 399.90},
}

type ProductController struct{}

func (pc *ProductController) GetProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, products)
}
