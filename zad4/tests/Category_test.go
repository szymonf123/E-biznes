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

func setupTest(t *testing.T) (*echo.Echo, *gorm.DB) {
	e := echo.New()
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	assert.NoError(t, err)

	err = db.AutoMigrate(&models.Category{})
	assert.NoError(t, err)

	return e, db
}

func withDBContext(e *echo.Echo, db *gorm.DB, req *http.Request) echo.Context {
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.Set("db", db)
	return c
}

func TestGetCategories(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	db.Create(&models.Category{Name: "Test1"})
	db.Create(&models.Category{Name: "Test2"})

	req := httptest.NewRequest(http.MethodGet, "/categories", nil)
	c := withDBContext(e, db, req)

	err := controller.GetCategories(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestGetCategoryByIDSuccess(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	cat := models.Category{Name: "Sample"}
	db.Create(&cat)

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/categories/%d", cat.ID), nil)
	c := withDBContext(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(cat.ID))

	err := controller.GetCategoryByID(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestGetCategoryByIDNotFound(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	req := httptest.NewRequest(http.MethodGet, "/categories/999", nil)
	c := withDBContext(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("999")

	err := controller.GetCategoryByID(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, c.Response().Status)
}

func TestGetCategoryByIDInvalidID(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	req := httptest.NewRequest(http.MethodGet, "/categories/abc", nil)
	c := withDBContext(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("abc")

	err := controller.GetCategoryByID(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusBadRequest, c.Response().Status)
}

func TestAddCategorySuccess(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	payload := `{"name":"Nowa"}`
	req := httptest.NewRequest(http.MethodPost, "/categories", bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContext(e, db, req)

	err := controller.AddCategory(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, c.Response().Status)
}

func TestAddCategoryInvalidJSON(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	payload := `{"invalid"`
	req := httptest.NewRequest(http.MethodPost, "/categories", bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContext(e, db, req)

	err := controller.AddCategory(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusBadRequest, c.Response().Status)
}

func TestUpdateCategorySuccess(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	cat := models.Category{Name: "Old"}
	db.Create(&cat)

	payload := `{"name":"Updated"}`
	req := httptest.NewRequest(http.MethodPut, fmt.Sprintf("/categories/%d", cat.ID), bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContext(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(cat.ID))

	err := controller.UpdateCategory(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestUpdateCategoryNotFound(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	payload := `{"name":"X"}`
	req := httptest.NewRequest(http.MethodPut, "/categories/999", bytes.NewBuffer([]byte(payload)))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c := withDBContext(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("999")

	err := controller.UpdateCategory(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, c.Response().Status)
}

func TestDeleteCategorySuccess(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	cat := models.Category{Name: "Do usunięcia"}
	db.Create(&cat)

	req := httptest.NewRequest(http.MethodDelete, fmt.Sprintf("/categories/%d", cat.ID), nil)
	c := withDBContext(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues(fmt.Sprint(cat.ID))

	err := controller.DeleteCategory(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, c.Response().Status)
}

func TestDeleteCategoryNotFound(t *testing.T) {
	e, db := setupTest(t)
	controller := &controllers.CategoryController{}

	req := httptest.NewRequest(http.MethodDelete, "/categories/999", nil)
	c := withDBContext(e, db, req)
	c.SetParamNames("id")
	c.SetParamValues("999")

	err := controller.DeleteCategory(c)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusNotFound, c.Response().Status)
}
