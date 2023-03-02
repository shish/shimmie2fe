/// <reference types="Cypress" />

export {};

describe("create new account", () => {
    it("signup", () => {
        let name = "signupTest" + (new Date().getTime() % 1000000);

        cy.visit("/");
        cy.get('[data-cy="user-icon"]').click();
        cy.contains("Sign Up").click();

        cy.get('[placeholder="User Name"]').type(name);
        cy.get('[placeholder="Password"]').type(name);
        cy.get('[placeholder="Repeat Password"]').type(name);
        cy.get('[placeholder="Email"]').type(name + "@example.com");
        cy.contains("Sign Up").click();

        cy.contains(name);
    });
});
