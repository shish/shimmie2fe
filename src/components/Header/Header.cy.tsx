/// <reference types="Cypress" />
/// <reference path="../../../cypress/support/component.ts" />

import React from "react";
import { Header } from ".";

describe('test', () => {
  it('playground', () => {
  })

  it('autocomplete', () => {
    cy.mount(<Header />)

    cy.get('[name="tags"]').clear().type("tag")
    cy.contains("tagme").click()
    cy.get('[name="tags"]').should('have.value', 'tagme ')

    cy.get('[name="tags"]').clear().type("tag cake")
    cy.get('[name="tags"]').then(($el) => {
      ($el[0] as HTMLInputElement).selectionStart = 2;
      ($el[0] as HTMLInputElement).selectionEnd = 2;
    })
    cy.contains("tagme").click()
    cy.get('[name="tags"]').should('have.value', 'tagme cake ')
  })

  // FIXME: set caret
})
