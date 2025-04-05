package main

import (
	"github.com/labstack/echo/v4"
	"zad4/routes"
)

func main() {
	e := echo.New()

	routes.ProductRoutes(e)
	e.Logger.Fatal(e.Start(":8080"))
}
