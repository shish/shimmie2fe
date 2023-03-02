/// <reference types="Cypress" />

export {};

describe("look at recent comments", () => {
    it("get most recent page (anon)", () => {
        cy.visit("/comments");
        cy.contains("Post Comment").should("not.exist");
    });
    it("get most recent page (admin)", () => {
        cy.login("demo", "demo");
        cy.visit("/comments");
        cy.contains("Post Comment").should("exist");
    });
    it("post a comment", () => {
        let text = "Test Comment " + (new Date().getTime() % 1000000);
        cy.login("demo", "demo");
        cy.visit("/comments");
        cy.get("article textarea").eq(0).type(text);
        cy.get("article input").eq(0).click();
        cy.get("article textarea").eq(0).should("have.value", "");
        cy.contains(text).should("exist");
    });
});
