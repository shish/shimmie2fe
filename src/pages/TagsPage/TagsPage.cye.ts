/// <reference types="Cypress" />

export {}

describe('browse tags', () => {
    it('tag map shows tagme', () => {
        cy.visit('/tags/map')
        cy.contains("t").click()
        cy.contains("tagme").should('exist')
    })
})
