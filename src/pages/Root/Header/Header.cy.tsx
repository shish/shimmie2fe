/// <reference types="Cypress" />
/// <reference path="../../../../cypress/support/component.ts" />

import React from "react";
import { GET_TAGS } from "../../../components/Autocomplete/Autocomplete";
import { Header } from "./Header";

describe('test', () => {
  it('navbar', () => {
    cy.mount(<Header />)
    cy.get('[data-cy="hamburger"]').click()
    cy.contains("Upload") // FIXME: only if user has permission
    cy.contains("Comments")
  })

  it('search', () => {
    const mocks = [
      {
        request: {query: GET_TAGS, variables: {start: ""}},
        result: {data: {tags: []}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "t"}},
        result: {data: {tags: [{tag: "tagme", uses: 10}]}}
      },
    ];
    cy.mount(<Header />, { mocks })

    cy.get('[name="tags"]').clear().type("t")
    cy.contains("tagme").click()
    cy.get('[name="tags"]').should('have.value', 'tagme ')
    cy.get('[data-cy="header-search"]').click()
    // FIXME: check that we navigated to the search page
  })

  it('userbar', () => {
    cy.mount(<Header />)
    cy.get('[data-cy="user-icon"]').click()
    cy.contains("My Profile")
    cy.contains("Log Out")
  })

  it('playground', () => {
    cy.mount(<Header />)
  })
})
