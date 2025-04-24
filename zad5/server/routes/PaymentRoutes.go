package routes

import (
	"github.com/labstack/echo/v4"
	"server/controllers"
)

func PaymentRoutes(e *echo.Echo) {
	paymentController := controllers.PaymentController{}

	e.GET("/payments", paymentController.GetPayments)
	e.POST("/payments", paymentController.AddPayment)
}
