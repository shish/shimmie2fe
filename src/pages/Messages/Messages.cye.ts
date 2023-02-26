/// <reference types="Cypress" />

export {}

describe('send and receive messages', () => {
    it('view messages', () => {
        cy.visit('/messages')
    })
})
