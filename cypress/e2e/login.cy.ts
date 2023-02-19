/// <reference types="Cypress" />

describe('login cycle', () => {
    it('signup', () => {
        cy.visit('/')
        cy.get('[data-cy="user-icon"]').click()
        cy.contains("Sign Up").click()
        //expect(true).to.equal(false)
    })

    it('login with button', () => {
        cy.visit('/')
        cy.contains("demo").should('not.exist')

        cy.get('[data-cy="user-icon"]').click()
        cy.get('[placeholder="User Name"]').type("demo")
        cy.get('[placeholder="Password"]').type("demo")
        cy.get('[value="Log In"]').click()
        cy.contains("demo")
    })

    it('login with enter', () => {
        cy.visit('/')
        cy.contains("demo").should('not.exist')

        cy.get('[data-cy="user-icon"]').click()
        cy.get('[placeholder="User Name"]').type("demo")
        cy.get('[placeholder="Password"]').type("demo{enter}")
        cy.contains("demo")
    })

    it('logout', () => {
        cy.login("demo", "demo")
        cy.visit('/')

        cy.get('[data-cy="user-icon"]').click()
        cy.contains('Log Out').click()
        cy.contains("demo").should('not.exist')
    })
})
