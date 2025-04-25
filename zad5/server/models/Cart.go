package models

type Cart struct {
	Id       int   `json:"id"`
	Products []int `json:"products"`
}
