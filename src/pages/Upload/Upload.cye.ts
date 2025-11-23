const f1 = "cypress/fixtures/bedroom_workshop.jpg";
const f2 = "cypress/fixtures/pbx_screenshot.jpg";

describe("upload", () => {
    beforeEach(() => {
        cy.login("demo", "demo");
        cy.visit("/upload");
        cy.contains("demo").should("exist");
    });

    it("nothing to upload", () => {
        cy.get('input[type="submit"]').should("be.disabled");
    });
    it("add one image", () => {
        cy.get('input[type="file"]').selectFile(f1);
        cy.wait(250); //
        cy.get('input[type="submit"]').should("not.be.disabled");
        cy.get("article img").should("exist");
    });
    it("add multiple image", () => {
        cy.get('input[type="file"]').selectFile([f1, f2]);
        cy.wait(250); //
        cy.get('input[type="submit"]').should("not.be.disabled");
        cy.get("article img").eq(1).should("exist");
        cy.get("article img").eq(2).should("not.exist");
    });
    it("drag & drop multiple images", () => {
        cy.get("article").selectFile([f1, f2], { action: "drag-drop" });
        cy.wait(250); //
        cy.get('input[type="submit"]').should("not.be.disabled");
        cy.get("article img").eq(1).should("exist");
        cy.get("article img").eq(2).should("not.exist");
    });
    it("add one non-image", () => {
        cy.get('input[type="file"]').selectFile({
            contents: Cypress.Buffer.from("file contents"),
            fileName: "file.txt",
            lastModified: Date.now(),
        });
        cy.wait(250); //
        cy.get('input[type="submit"]').should("not.be.disabled");
        cy.get("article img").should("not.exist");
    });
});
