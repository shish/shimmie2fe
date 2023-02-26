/// <reference types="Cypress" />

export {}

describe('about page', () => {
    it('should exist', () => {
        cy.visit('/about')
    })
})
