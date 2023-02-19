/// <reference types="Cypress" />

describe('post list', () => {
    it('no searching, just select a post', () => {
    })

    it('select a post from the second page of posts', () => {
    })

    it('search with results', () => {
    })

    it('select a post from the second page of search results', () => {
    })

    it('search with no results', () => {
        cy.visit('/')
        cy.get('[name="tags"]').clear().type("notarealtag{enter}")
        cy.contains("No posts tagged with")
    })

    it('use autocomplete', () => {
        cy.visit('/')
        cy.get('[name="tags"]').clear().type("tag")
        cy.contains("tagme").click()
        cy.get('[name="tags"]').should('have.value', 'tagme ')

        cy.get('[name="tags"]').clear().type("cake tag")
        cy.contains("tagme").click()
        cy.get('[name="tags"]').should('have.value', 'cake tagme ')
    })
})
  