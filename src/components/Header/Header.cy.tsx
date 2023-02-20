/// <reference types="Cypress" />
/// <reference path="../../../cypress/support/component.ts" />

import React from "react";
import { GET_TAGS, Header } from ".";

describe('test', () => {
  it('playground', () => {
  })

  it('autocomplete', () => {
    const mocks = [
      {
        request: {query: GET_TAGS, variables: {start: ""}},
        result: {data: {tags: []}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "t"}},
        result: {data: {tags: [{tag: "tagme", uses: 10}]}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "ta"}},
        result: {data: {tags: [{tag: "tagme", uses: 10}]}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "tag"}},
        result: {data: {tags: [{tag: "tagme", uses: 10}]}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "tagm"}},
        result: {data: {tags: [{tag: "tagme", uses: 10}]}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "tagme"}},
        result: {data: {tags: [{tag: "tagme", uses: 10}]}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "c"}},
        result: {data: {tags: [{tag: "cake", uses: 5}]}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "ca"}},
        result: {data: {tags: [{tag: "cake", uses: 5}]}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "cak"}},
        result: {data: {tags: [{tag: "cake", uses: 5}]}}
      },
      {
        request: {query: GET_TAGS, variables: {start: "cake"}},
        result: {data: {tags: [{tag: "cake", uses: 5}]}}
      },
    ];
    cy.mount(<Header />, { mocks })

    cy.get('[name="tags"]').clear().type("tag")
    cy.contains("tagme").click()
    cy.get('[name="tags"]').should('have.value', 'tagme ')

    cy.get('[name="tags"]').clear().type("tag cake")
    cy.get('[name="tags"]').then(($el) => {
      ($el[0] as HTMLInputElement).selectionStart = 2;
      ($el[0] as HTMLInputElement).selectionEnd = 2;
    })
    cy.contains("tagme").click()
    cy.get('[name="tags"]').should('have.value', 'tagme cake')
  })
})
