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

func setupTestProducts(t *testing.T) (*echo.Echo, *gorm.DB) {
	e := echo.New()
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	assert.NoError(t, err)

	err = db.AutoMigrate(&models.Product{})
	assert.NoError(t, err)

	return e, db
}

func withDBContextProducts(e *echo.Echo, db *gorm.DB, req *http.Request) echo.Context {
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.Set("db", db)
	return c
}

func TestGetProducts(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	db.Create(&models.Product{Name: "test", Price: 100.0, CategoryID: 1})
	db.Create(&models.Product{Name: "test2", Price: 100.98, CategoryID: 1})

	req := httptest.NewRequest(http.MethodGet, "/categories", nil)
	c := withDBContextProducts(e, db, req)

	err := controller.GetProducts(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestGetProductByIDSuccess(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	product := models.Product{Name: "test", Price: 100.0, CategoryID: 1}
	db.Create(&product)

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/products/%d", product.ID), nil)
	c := withDBContextProducts(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(product.ID))

	err := controller.GetProductByID(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestGetProductByIDNotFound(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	req := httptest.NewRequest(http.MethodGet, "/products/999", nil)
	c := withDBContextProducts(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("999")

	err := controller.GetProductByID(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, c.Response().Status)
}

func TestGetProductByIDInvalidID(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	req := httptest.NewRequest(http.MethodGet, "/products/abc", nil)
	c := withDBContextProducts(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("abc")

	err := controller.GetProductByID(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusBadRequest, c.Response().Status)
}

func TestAddProductSuccess(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	payload := `{"name": "test", "price": 100.0, "categoryID": 1}`
	req := httptest.NewRequest(http.MethodPost, "/products", bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContextProducts(e, db, req)

	err := controller.AddProduct(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, c.Response().Status)
}

func TestAddProductInvalidJSON(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	payload := `{"invalid"`
	req := httptest.NewRequest(http.MethodPost, "/products", bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContextProducts(e, db, req)

	err := controller.AddProduct(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusBadRequest, c.Response().Status)
}

func TestUpdateProductSuccess(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	product := models.Product{Name: "test3", Price: 234.99, CategoryID: 2}
	db.Create(&product)

	payload := `{"name":"test3_updated","price":356.12,"categoryID":2}`
	req := httptest.NewRequest(http.MethodPut, fmt.Sprintf("/products/%d", product.ID), bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContextProducts(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(product.ID))

	err := controller.UpdateProduct(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestUpdateProductNotFound(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	payload := `{"name":"test3_updated","price":356.12,"categoryID":2}`
	req := httptest.NewRequest(http.MethodPut, "/products/999", bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContextProducts(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("999")

	err := controller.UpdateProduct(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, c.Response().Status)
}

func TestDeleteProductSuccess(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	product := models.Product{Name: "test to delete", Price: 100.0, CategoryID: 1}
	db.Create(&product)

	req := httptest.NewRequest(http.MethodDelete, fmt.Sprintf("/products/%d", product.ID), nil)
	c := withDBContextProducts(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(product.ID))

	err := controller.DeleteProduct(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestDeleteProductNotFound(t *testing.T) {
	e, db := setupTestProducts(t)
	controller := &controllers.ProductController{}

	req := httptest.NewRequest(http.MethodDelete, "/products/999", nil)
	c := withDBContextProducts(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("999")

	err := controller.DeleteProduct(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, c.Response().Status)
}
