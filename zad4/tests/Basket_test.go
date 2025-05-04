package tests

import (
	"bytes"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"net/http"
	"net/http/httptest"
	"testing"
	"zad4/controllers"
	"zad4/models"
)

func setupTestBaskets(t *testing.T) (*echo.Echo, *gorm.DB) {
	e := echo.New()
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	assert.NoError(t, err)

	err = db.AutoMigrate(&models.Basket{})
	assert.NoError(t, err)

	return e, db
}

func withDBContextBaskets(e *echo.Echo, db *gorm.DB, req *http.Request) echo.Context {
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.Set("db", db)
	return c
}

func TestGetBaskets(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	db.Create(&models.Basket{UserID: 2, ProductID: 1, Number: 2})
	db.Create(&models.Basket{UserID: 1, ProductID: 2, Number: 6})

	req := httptest.NewRequest(http.MethodGet, "/baskets", nil)
	c := withDBContextBaskets(e, db, req)

	err := controller.GetBasket(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestGetBasketByIDSuccess(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	cat := models.Basket{UserID: 1, ProductID: 1, Number: 2}
	db.Create(&cat)

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/baskets/%d", cat.ID), nil)
	c := withDBContextBaskets(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(cat.ID))

	err := controller.GetBasketByID(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestGetBasketByIDNotFound(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	req := httptest.NewRequest(http.MethodGet, "/baskets/999", nil)
	c := withDBContextBaskets(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("999")

	err := controller.GetBasketByID(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, c.Response().Status)
}

func TestGetBasketByIDInvalidID(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	req := httptest.NewRequest(http.MethodGet, "/baskets/abc", nil)
	c := withDBContextBaskets(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("abc")

	err := controller.GetBasketByID(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusBadRequest, c.Response().Status)
}

func TestAddBasketSuccess(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	payload := `{"userID":1,"productID":1,"number":4}`
	req := httptest.NewRequest(http.MethodPost, "/baskets", bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContextBaskets(e, db, req)

	err := controller.AddBasket(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, c.Response().Status)
}

func TestAddBasketInvalidJSON(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	payload := `{"invalid"`
	req := httptest.NewRequest(http.MethodPost, "/baskets", bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContextBaskets(e, db, req)

	err := controller.AddBasket(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusBadRequest, c.Response().Status)
}

func TestUpdateBasketSuccess(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	cat := models.Basket{UserID: 1, ProductID: 1, Number: 2}
	db.Create(&cat)

	payload := `{"userID":1,"productID":1,"number":4}`
	req := httptest.NewRequest(http.MethodPut, fmt.Sprintf("/baskets/%d", cat.ID), bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContextBaskets(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(cat.ID))

	err := controller.UpdateBasket(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestUpdateBasketNotFound(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	payload := `{"userID":1,"productID":1,"number":4}`
	req := httptest.NewRequest(http.MethodPut, "/baskets/999", bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContextBaskets(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("999")

	err := controller.UpdateBasket(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, c.Response().Status)
}

func TestDeleteBasketSuccess(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	cat := models.Basket{UserID: 1, ProductID: 1, Number: 2}
	db.Create(&cat)

	req := httptest.NewRequest(http.MethodDelete, fmt.Sprintf("/baskets/%d", cat.ID), nil)
	c := withDBContextBaskets(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(cat.ID))

	err := controller.DeleteBasket(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestDeleteBasketNotFound(t *testing.T) {
	e, db := setupTestBaskets(t)
	controller := &controllers.BasketController{}

	req := httptest.NewRequest(http.MethodDelete, "/baskets/999", nil)
	c := withDBContextBaskets(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("999")

	err := controller.DeleteBasket(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, c.Response().Status)
}
