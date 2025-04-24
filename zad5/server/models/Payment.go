package models

type Payment struct {
	CardNumber string  `json:"cardNumber"`
	Amount     float64 `json:"amount"`
}
