/// <reference types="Cypress" />

export {}

describe('look at recent comments', () => {
    it('get most recent page', () => {
        cy.visit('/comments')
    })
})
