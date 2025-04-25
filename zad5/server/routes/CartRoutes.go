package routes

import (
	"github.com/labstack/echo/v4"
	"server/controllers"
)

func CartRoutes(e *echo.Echo) {
	cartController := controllers.CartController{}

	e.GET("/cart", cartController.GetCart)
	e.POST("/cart", cartController.AddProduct)
}
