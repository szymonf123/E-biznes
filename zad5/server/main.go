package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
	"server/routes"
)

//TIP <p>To run your code, right-click the code and select <b>Run</b>.</p> <p>Alternatively, click
// the <icon src="AllIcons.Actions.Execute"/> icon in the gutter and select the <b>Run</b> menu item from here.</p>

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://zad5-frontend-app.azurewebsites.net"},
		AllowMethods: []string{http.MethodGet, http.MethodPost},
	}))
	routes.PaymentRoutes(e)
	routes.ProductRoutes(e)
	routes.CartRoutes(e)
	e.Logger.Fatal(e.Start(":8080"))
}
