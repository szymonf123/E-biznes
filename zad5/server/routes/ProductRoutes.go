package routes

import (
	"github.com/labstack/echo/v4"
	"server/controllers"
)

func ProductRoutes(e *echo.Echo) {
	productController := controllers.ProductController{}

	e.GET("/products", productController.GetProducts)
}
