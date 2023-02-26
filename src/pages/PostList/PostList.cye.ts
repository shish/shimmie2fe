/// <reference types="Cypress" />

export {}

describe('post list', () => {
    it('no searching, just select a post', () => {
        cy.visit('/')
        cy.get('[href^="/post/"]').first().click()
    })

    it('select a post from the second page of posts', () => {
    })

    it('search with results', () => {
        cy.visit('/')
        cy.get('[name="tags"]').clear().type("tagme{enter}")
        cy.get('[href^="/post/"]').first().click()
    })

    it('select a post from the second page of search results', () => {
    })

    it('search with no results', () => {
        cy.visit('/')
        cy.get('[name="tags"]').clear().type("notarealtag{enter}")
        cy.contains("No posts tagged with")
    })
})
  