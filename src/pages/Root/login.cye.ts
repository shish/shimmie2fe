/// <reference types="Cypress" />

export {};

describe("login cycle", () => {
    it("fail to log in", () => {
        cy.visit("/");
        cy.contains("demo").should("not.exist");

        cy.get('[data-cy="user-icon"]').click();
        cy.get('[placeholder="User Name"]').type("notexisting");
        cy.get('[placeholder="Password"]').type("notexisting");
        cy.get('[value="Log In"]').click();
        cy.contains("No user found").should("exist");
    });

    it("login with button", () => {
        cy.visit("/");
        cy.contains("demo").should("not.exist");

        cy.get('[data-cy="user-icon"]').click();
        cy.get('[placeholder="User Name"]').type("demo");
        cy.get('[placeholder="Password"]').type("demo");
        cy.get('[value="Log In"]').click();
        cy.contains("demo").should("exist");
    });

    it("login with enter", () => {
        cy.visit("/");
        cy.contains("demo").should("not.exist");

        cy.get('[data-cy="user-icon"]').click();
        cy.get('[placeholder="User Name"]').type("demo");
        cy.get('[placeholder="Password"]').type("demo{enter}");
        cy.contains("demo").should("exist");
    });

    it("logout", () => {
        cy.login("demo", "demo");
        cy.visit("/");

        cy.get('[data-cy="user-icon"]').click();
        cy.contains("Log Out").click();
        cy.contains("demo").should("not.exist");
    });
});
