/// <reference types="Cypress" />
/// <reference path="../../../../cypress/support/component.ts" />

import { GET_TAGS } from "../../../components/Autocomplete/Autocomplete";
import { Header } from "./Header";

describe("test", () => {
    it("navbar", () => {
        cy.mount(<Header display={true} />);
        cy.get('[data-cy="hamburger"]').click();
        cy.contains("Upload");
        cy.contains("Comments");
    });

    it("search", () => {
        const mocks = [
            {
                request: { query: GET_TAGS, variables: { start: "" } },
                result: { data: { tags: [] } },
            },
            {
                request: { query: GET_TAGS, variables: { start: "t" } },
                result: { data: { tags: [{ tag: "tagme", uses: 10 }] } },
            },
        ];
        cy.mount(<Header display={true} />, { mocks });

        cy.get('[name="tags"]').clear().type("t");
        cy.contains("tagme").click();
        cy.get('[name="tags"]').should("have.value", "tagme ");
        cy.get('[data-cy="header-search"]').click();
        cy.url().should('include', '/posts?tags=cake')
    });

    it("userbar", () => {
        cy.mount(<Header display={true} />);
        cy.get('[data-cy="user-icon"]').click();
        cy.contains("My Profile");
        cy.contains("Log Out");
    });

    it.skip("hide and show", () => {
        // FIXME: change props instead of re-mounting
        cy.mount(<Header display={true} />);
        cy.get('[data-cy="user-icon"]').should('be.visible');
        cy.mount(<Header display={false} />);
        cy.get('[data-cy="user-icon"]').should('not.be.visible');
        cy.mount(<Header display={true} />);
        cy.get('[data-cy="user-icon"]').should('be.visible');
    });

    it("playground", () => {
        cy.mount(<Header display={true} />);
    });
});
