/// <reference types="Cypress" />

export {};

describe("browse tags", () => {
    it("tag map shows tagme", () => {
        cy.visit("/tags/map");
        cy.get("[data-cy-initial='t']").click();
        cy.contains("tagme").should("exist");
    });
});
