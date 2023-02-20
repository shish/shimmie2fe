/// <reference types="Cypress" />

describe('login cycle', () => {
    it('signup', () => {
        cy.visit('/')
        cy.get('[data-cy="user-icon"]').click()
        cy.contains("Sign Up").click()

        let name = "signupTest" + ((new Date()).getTime() % 1000000);
        cy.get('[placeholder="User Name"]').type(name)
        cy.get('[placeholder="Password"]').type(name)
        cy.get('[placeholder="Repeat Password"]').type(name)
        cy.get('[placeholder="Email"]').type(name+"@example.com")
        cy.contains("Sign Up").click()

        cy.contains(name);
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
