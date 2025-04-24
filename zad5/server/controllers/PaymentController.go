package controllers

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"server/models"
	_ "strconv"
)

var payments = []models.Payment{}

type PaymentController struct{}

func (pc *PaymentController) GetPayments(c echo.Context) error {
	return c.JSON(http.StatusOK, payments)
}

func (pc *PaymentController) AddPayment(c echo.Context) error {
	var newPayment models.Payment
	if err := c.Bind(&newPayment); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	payments = append(payments, newPayment)
	return c.JSON(http.StatusCreated, newPayment)
}
