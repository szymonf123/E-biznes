describe("Login", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("1. Should login correctly with correct username and password", () => {
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();

        cy.url().should("eq", Cypress.config().baseUrl + "inventory.html");
        cy.get(".title").should("have.text", "Products");
        cy.get(".inventory_list").should("be.visible");
    });

    it("2. Should show error for correct username but incorrect password", () => {
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("123456");
        cy.get("#login-button").click();

        cy.url().should("eq", Cypress.config().baseUrl);
        cy.get(".error-button").should("be.visible");
        cy.get("[data-test='error']").should("contain.text", "Epic sadface: Username and password do not match any user in this service");
    });

    it("3. Should show error for empty username", () => {
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();

        cy.url().should("eq", Cypress.config().baseUrl);
        cy.get(".error-button").should("be.visible");
        cy.get("[data-test='error']").should("contain.text", "Epic sadface: Username is required");
    });

    it("4. Should show error for empty password", () => {
        cy.get("#user-name").type("standard_user");
        cy.get("#login-button").click();

        cy.url().should("eq", Cypress.config().baseUrl);
        cy.get(".error-button").should("be.visible");
        cy.get("[data-test='error']").should("contain.text", "Epic sadface: Password is required");
    });
});

describe("Product List", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();
    });

    it("5. Should add a product to the cart", () => {
        cy.get("[data-test='add-to-cart-sauce-labs-backpack']").click();

        cy.get("[data-test='remove-sauce-labs-backpack']").should("be.visible");
        cy.get("[data-test='remove-sauce-labs-backpack']").should("have.text", "Remove");
        cy.get("[data-test='shopping-cart-badge']").should("have.text", "1");
    });

    it("6. Should add different products to the cart", () => {
        cy.get("[data-test='add-to-cart-sauce-labs-backpack']").click();
        cy.get("[data-test='add-to-cart-sauce-labs-bolt-t-shirt']").click();

        cy.get("[data-test='remove-sauce-labs-backpack']").should("be.visible");
        cy.get("[data-test='remove-sauce-labs-backpack']").should("have.text", "Remove");
        cy.get("[data-test='remove-sauce-labs-bolt-t-shirt']").should("be.visible");
        cy.get("[data-test='remove-sauce-labs-bolt-t-shirt']").should("have.text", "Remove");
        cy.get("[data-test='shopping-cart-badge']").should("have.text", "2");
    });

    it("7. Should sort products by name descending", () => {
        cy.get("[data-test='product-sort-container']").select("za");

        cy.get(".inventory_item_name").then(($els) => {
            const actualNames = [...$els].map(el => el.textContent.trim());
            const sorted = [...actualNames].sort((a, b) => b.localeCompare(a));
            expect(actualNames).to.deep.equal(sorted);
        });
    });

    it("8. Should sort products by price ascending", () => {
        cy.get("[data-test='product-sort-container']").select("lohi");

        cy.get(".inventory_item_price").then(($els) => {
            const actualPrices = [...$els].map(el => parseFloat(el.textContent.trim().slice(1)));
            const sortedPrices = [...actualPrices].sort((a, b) => {return a - b});
            console.log(sortedPrices);
            expect(actualPrices).to.deep.equal(sortedPrices);
        });
    });

    it("9. Should remove product from the cart", () => {
        cy.get("[data-test='add-to-cart-sauce-labs-backpack']").click();
        cy.get("[data-test='remove-sauce-labs-backpack']").click();

        cy.get("[data-test='remove-sauce-labs-backpack']").should("not.exist");
        cy.get("[data-test='add-to-cart-sauce-labs-backpack']").should("be.visible");
        cy.get("[data-test='add-to-cart-sauce-labs-backpack']").should("have.text", "Add to cart");
        cy.get("[data-test='shopping-cart-badge']").should("not.exist");
    });

    it("10. Should show product details", () => {
        cy.get(".inventory_item_name").last().click();

        cy.get(".inventory_details_img").first().should("be.visible");
        cy.get("[data-test='inventory-item-name']").should("be.visible");
        cy.get("[data-test='add-to-cart']").should("be.visible");
    });
});

describe("Product Details", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();
        cy.get(".inventory_item_name").last().click();
    });

    it("11. Should add product to the cart", () => {
        cy.get("#add-to-cart").click();

        cy.get("#remove").should("be.visible");
        cy.get("#remove").should("have.text", "Remove");
        cy.get("[data-test='shopping-cart-badge']").should("have.text", "1");
    });

    it("12. Should go back to the product list", () => {
        cy.get("#back-to-products").click();

        cy.url().should("eq", Cypress.config().baseUrl + "inventory.html");
        cy.get(".title").should("have.text", "Products");
        cy.get(".inventory_list").should("be.visible");
    });

    it("13. Should add multiple products to the cart after going there and back", () => {
        cy.get("#add-to-cart").click();
        cy.get("#back-to-products").click();
        cy.get("#add-to-cart-sauce-labs-fleece-jacket").click();
        cy.get(".inventory_item_name").first().click();
        cy.get("#add-to-cart").click();
        cy.get("#back-to-products").click();
        cy.get(".inventory_item_name").eq(1).click();
        cy.get("#add-to-cart").click();

        cy.get("[data-test='shopping-cart-badge']").should("have.text", "4");
    });
});

describe("Cart", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();
        cy.get(".inventory_item_name").first().click();
        cy.get("#add-to-cart").click();
        cy.get(".shopping_cart_link").first().click();
    });

    it("14. Should go to product list after choosing Continue Shopping", () => {
        cy.get("#continue-shopping").click();

        cy.url().should("eq", Cypress.config().baseUrl + "inventory.html");
        cy.get(".title").should("have.text", "Products");
        cy.get(".inventory_list").should("be.visible");
    });

    it("15. Should remove an item after choosing Remove", () => {
        cy.get("#remove-sauce-labs-backpack").click();

        cy.get(".cart_item").should("not.exist");
    });

    it("16. Should go to the checkout after choosing Checkout", () => {
        cy.get("#checkout").click();

        cy.url().should("eq", Cypress.config().baseUrl + "checkout-step-one.html");
        cy.get(".header_secondary_container").first().should("have.text", "Checkout: Your Information");
        cy.get("#continue").should("be.visible");
        cy.get("form").should("be.visible");
    });
});

describe("Checkout", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();
        cy.get(".inventory_item_name").first().click();
        cy.get("#add-to-cart").click();
        cy.get(".shopping_cart_link").first().click();
        cy.get("#checkout").click();
    });

    it("17. Should go to the summary after typing correct personal data", () => {
        cy.get("#first-name").type("Jan");
        cy.get("#last-name").type("Kowalski");
        cy.get("#postal-code").type("12-345");
        cy.get("#continue").click();

        cy.url().should("eq", Cypress.config().baseUrl + "checkout-step-two.html");
        cy.get(".header_secondary_container").first().should("have.text", "Checkout: Overview");
        cy.get("#finish").should("be.visible");
    });

    it("18. Should show error after typing empty last name", () => {
        cy.get("#first-name").type("Jan");
        cy.get("#postal-code").type("12-345");
        cy.get("#continue").click();

        cy.url().should("eq", Cypress.config().baseUrl + "checkout-step-one.html");
        cy.get(".error-message-container").should("be.visible");
        cy.get(".error-message-container").should("have.text", "Error: Last Name is required");
    });
});

describe("Overview", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();
        cy.get(".inventory_item_name").first().click();
        cy.get("#add-to-cart").click();
        cy.get(".shopping_cart_link").first().click();
        cy.get("#checkout").click();
        cy.get("#first-name").type("Jan");
        cy.get("#last-name").type("Kowalski");
        cy.get("#postal-code").type("12-345");
        cy.get("#continue").click();
    });

    it("19. Should finish the checkout", () => {
        cy.get("#finish").click();

        cy.url().should("eq", Cypress.config().baseUrl + "checkout-complete.html");
        cy.get(".header_secondary_container").first().should("have.text", "Checkout: Complete!");
        cy.get(".complete-header").should("have.text", "Thank you for your order!");
        cy.get(".btn").should("be.visible");
    });

    it("20. Should cancel the checkout after choosing Cancel", () => {
        cy.get("#cancel").click();

        cy.url().should("eq", Cypress.config().baseUrl + "inventory.html");
        cy.get(".title").should("have.text", "Products");
        cy.get(".inventory_list").should("be.visible");
    });
});