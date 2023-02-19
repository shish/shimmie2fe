/// <reference types="Cypress" />

describe('upload', () => {
    beforeEach(() => {
        cy.login("demo", "demo")
        cy.visit('/')
        cy.get('[data-cy="hamburger"]').click()
        cy.contains('Upload').click()
    })

    it('upload', () => {
        cy.visit('/')
        cy.get('[data-cy="hamburger"]').click()
        cy.contains('Upload').click()
    })
})
