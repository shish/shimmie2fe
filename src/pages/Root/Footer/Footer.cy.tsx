/// <reference types="Cypress" />
/// <reference path="../../../../cypress/support/component.ts" />

import { Footer } from "./Footer";

describe("test", () => {
    it("playground", () => {
        cy.mount(<Footer />);
    });
});
