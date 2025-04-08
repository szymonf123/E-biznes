package routes

import (
	"github.com/labstack/echo/v4"
	"zad4/controllers"
)

func CategoryRoutes(e *echo.Echo) {
	categoryController := controllers.CategoryController{}

	e.GET("/categories", categoryController.GetCategories)
	e.GET("/categories/:id", categoryController.GetCategoryByID)
	e.POST("/categories", categoryController.AddCategory)
	e.PUT("/categories/:id", categoryController.UpdateCategory)
	e.DELETE("/categories/:id", categoryController.DeleteCategory)
}
