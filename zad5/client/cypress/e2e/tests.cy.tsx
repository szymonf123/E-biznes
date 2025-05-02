// @ts-ignore
describe("Payments", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    it("1. Should show information about successfull payment after typing correct data", () => {
        cy.get("#card-number").type("1234567890123456")
        cy.get("#amount").type("300.99")
        cy.get("button").click()

        cy.url().should("eq", Cypress.config().baseUrl)
        cy.get(".text-2xl").should("have.text", "Płatność")
        cy.contains("label", "Numer karty").should("be.visible")
        cy.get("#card-number").should("be.visible")
        cy.contains("label", "Kwota (PLN)").should("be.visible")
        cy.get("#amount").should("be.visible")
        cy.contains("button", "Zapłać").should("be.visible")
        cy.get(".payment-info").should("have.text", "Płatność zakończona sukcesem!")
    })

    it("2. Should show information about unsuccessfull payment after typing empty card number", () => {
        cy.get("#amount").type("300.99")
        cy.get("button").click()

        cy.url().should("eq", Cypress.config().baseUrl)
        cy.get(".text-2xl").should("have.text", "Płatność")
        cy.contains("label", "Numer karty").should("be.visible")
        cy.get("#card-number").should("be.visible")
        cy.contains("label", "Kwota (PLN)").should("be.visible")
        cy.get("#amount").should("be.visible")
        cy.contains("button", "Zapłać").should("be.visible")
        cy.get("p").should("not.exist")
    })

    it("3. Should show information about unsuccessfull payment after typing empty amount", () => {
        cy.get("#card-number").type("1234567890123456")
        cy.get("button").click()

        cy.url().should("eq", Cypress.config().baseUrl)
        cy.get(".text-2xl").should("have.text", "Płatność")
        cy.contains("label", "Numer karty").should("be.visible")
        cy.get("#card-number").should("be.visible")
        cy.contains("label", "Kwota (PLN)").should("be.visible")
        cy.get("#amount").should("be.visible")
        cy.contains("button", "Zapłać").should("be.visible")
        cy.get("p").should("not.exist")
    })

    it("4. Should go to product list after choosing Produkty", () => {
        cy.contains("a", "Produkty").click()

        cy.url().should("eq", Cypress.config().baseUrl + "cart")
        cy.get(".text-xl").should("have.text", "Produkty")
        cy.get("ol").should("exist")
        cy.get("label").should("have.text", "Podaj ID produktu do dodania:")
        cy.get("#product-id").should("be.visible")
        cy.get("button").should("have.text", "Dodaj do koszyka")
    })

    it("5. Should go to cart after choosing Koszyk klienta", () => {
        cy.contains("a", "Koszyk klienta").click()

        cy.url().should("eq", Cypress.config().baseUrl + "client")
        cy.get(".text-2xl").should("have.text", "Twój koszyk")
        cy.get('body').then(($body) => {
            const hasEmptyText = $body.find('p:contains("Koszyk jest pusty")').length > 0
            const hasUl = $body.find('ul').length > 0
            assert.isTrue(hasEmptyText || hasUl)
        })
    })
})

describe("Product list", () => {
    beforeEach(() => {
        cy.visit("/cart")
    })

    it("6. Should add a product to the cart", () => {
        cy.get("#product-id").type("1")
        cy.get("button").click()

        cy.url().should("eq", Cypress.config().baseUrl + "cart")
        cy.contains("p", "Dodano do koszyka!").should("be.visible")

        cy.visit("/client")

        cy.get("ul li").then(($el) => {
            assert.isTrue($el.length >= 1)
        })
    })

    it("7. Should add multiple products to the cart", () => {
        cy.get("#product-id").type("1")
        cy.get("button").click()
        cy.get("#product-id").type("1")
        cy.get("button").click()
        cy.get("#product-id").type("2")
        cy.get("button").click()

        cy.url().should("eq", Cypress.config().baseUrl + "cart")
        cy.contains("p", "Dodano do koszyka!").should("be.visible")

        cy.visit("/client")

        cy.get("ul li").then(($el) => {
            assert.isTrue($el.length >= 3)
        })
    })

    it("8. Should go to payments after choosing Płatność", () => {
        cy.contains("a", "Płatność").click()

        cy.url().should("eq", Cypress.config().baseUrl)
        cy.get(".text-2xl").should("have.text", "Płatność")
        cy.contains("label", "Numer karty").should("be.visible")
        cy.get("#card-number").should("be.visible")
        cy.contains("label", "Kwota (PLN)").should("be.visible")
        cy.get("#amount").should("be.visible")
        cy.contains("button", "Zapłać").should("be.visible")
    })

    it("9. Should go to cart after choosing Koszyk klienta", () => {
        cy.contains("a", "Koszyk klienta").click()

        cy.url().should("eq", Cypress.config().baseUrl + "client")
        cy.get(".text-2xl").should("have.text", "Twój koszyk")
        cy.get('body').then(($body) => {
            const hasEmptyText = $body.find('p:contains("Koszyk jest pusty")').length > 0
            const hasUl = $body.find('ul').length > 0
            assert.isTrue(hasEmptyText || hasUl)
        })
    })
})

describe("Client's cart", () => {
    beforeEach(() => {
        cy.visit("/client")
    })

    it("10. Should go to product list after choosing Produkty", () => {
        cy.contains("a", "Produkty").click()

        cy.url().should("eq", Cypress.config().baseUrl + "cart")
        cy.get(".text-xl").should("have.text", "Produkty")
        cy.get("ol").should("exist")
        cy.get("label").should("have.text", "Podaj ID produktu do dodania:")
        cy.get("#product-id").should("be.visible")
        cy.get("button").should("have.text", "Dodaj do koszyka")
    })
})