package main

import (
	"github.com/labstack/echo/v4"
	"zad4/database"
	"zad4/routes"
)

func main() {
	e := echo.New()

	db := database.ConnectDatabase()
	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("db", db)
			return next(c)
		}
	})

	routes.ProductRoutes(e)
	routes.BasketRoutes(e)
	e.Logger.Fatal(e.Start(":8080"))
}
