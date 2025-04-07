package routes

import (
	"github.com/labstack/echo/v4"
	"zad4/controllers"
)

func BasketRoutes(e *echo.Echo) {
	basketController := controllers.BasketController{}

	e.GET("/baskets", basketController.GetBasket)
	e.GET("/baskets/:id", basketController.GetBasketByID)
	e.POST("/baskets", basketController.AddBasket)
	e.PUT("/baskets/:id", basketController.UpdateBasket)
	e.DELETE("/baskets/:id", basketController.DeleteBasket)
}
