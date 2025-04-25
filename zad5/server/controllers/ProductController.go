package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/models"
)

var products = []models.Product{
	{Id: 1, Name: "Laptop", Price: 3999.99},
	{Id: 2, Name: "Smartfon", Price: 2499.00},
	{Id: 3, Name: "Słuchawki", Price: 299.99},
	{Id: 4, Name: "Monitor", Price: 899.50},
	{Id: 5, Name: "Klawiatura mechaniczna", Price: 399.90},
}

type ProductController struct{}

func (pc *ProductController) GetProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, products)
}
