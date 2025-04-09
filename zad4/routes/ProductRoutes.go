package routes

import (
	"github.com/labstack/echo/v4"
	"zad4/controllers"
)

func ProductRoutes(e *echo.Echo) {
	productController := controllers.ProductController{}

	e.GET("/products", productController.GetProducts)
	e.GET("/products/:id", productController.GetProductByID)
	e.POST("/products", productController.AddProduct)
	e.PUT("/products/:id", productController.UpdateProduct)
	e.DELETE("/products/:id", productController.DeleteProduct)

	e.GET("/products-from-scope", productController.GetProductsFromScopes)
}
