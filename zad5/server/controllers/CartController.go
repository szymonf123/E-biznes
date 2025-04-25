package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/models"
)

var cart = models.Cart{
	Id:       1,
	Products: []int{},
}

type CartController struct{}

func (cc *CartController) GetCart(c echo.Context) error {
	return c.JSON(http.StatusOK, cart)
}

func (cc *CartController) AddProduct(c echo.Context) error {
	var req struct {
		Id int `json:"id"`
	}

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	cart.Products = append(cart.Products, req.Id)
	return c.JSON(http.StatusCreated, req.Id)
}
