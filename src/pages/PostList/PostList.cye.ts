/// <reference types="Cypress" />

export {};

describe("post list", () => {
    it("no searching, just select a post", () => {
        cy.visit("/");
        cy.get('[href^="/post/"]').first().click();
    });
    it.skip("select a post from the second page of posts", () => {
        // FIXME
    });

    it.skip("if the first set of results doesn't fill the screen, fetch more", () => {
        // FIXME
    });
    it.skip("if the screen is full, and the user scrolls down to the bottom, fetch more", () => {
        // FIXME
    });
    it.skip("if fetching more reaches the end of search results, stop fetching more", () => {
        // FIXME
    });

    it("search with no results", () => {
        cy.visit("/");
        cy.get('[name="tags"]').clear().type("notarealtag{enter}");
        cy.contains("No posts tagged with");
    });
    it("search with results", () => {
        cy.visit("/");
        cy.get('[name="tags"]').clear().type("tagme{enter}");
        cy.get('[href^="/post/"]').first().click();
    });
    it.skip("search with multiple pages of results", () => {
        // FIXME
    });
});
