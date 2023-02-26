/// <reference types="Cypress" />

export {};

describe("view post", () => {
    it("select a post", () => {
        cy.visit("/");
        cy.get('[href^="/post/"]').first().click();
        cy.contains("Uploader").should("exist");
    });
});
