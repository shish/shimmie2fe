describe("use wiki", () => {
    it("load index", () => {
        cy.visit("/wiki/Index");
        cy.contains("Index").should("exist");
    });
});
