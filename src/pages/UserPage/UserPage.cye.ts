/// <reference types="Cypress" />

export {}

describe('view user page', () => {
    it('load demo user', () => {
        cy.visit('/user/demo')
        cy.contains("demo").should('exist')
    })
    it('load nonexisting user', () => {
        cy.visit('/user/nonexisting')
        cy.contains("nonexisting").should('not.exist')
    })
})
